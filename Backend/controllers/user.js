// [SECTION] Dependencies and Modules
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");



// [SECTION] User Registration
module.exports.registerUser = (req, res) => {
	if (!req.body.email.includes("@")){
		return res.status(400).send({ error: "Email invalid" });
	}
	else if (req.body.mobileNo.length !== 11){
		return res.status(400).send({ error: "Mobile number invalid" });
	}
	else if (req.body.password.length < 8) {
		return res.status(400).send({ error: "Password must be atleast 8 characters" });
	} else {
		let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			// 10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password
			password: bcrypt.hashSync(req.body.password, 10)
		})
		return newUser.save()
		.then((result) => res.status(201).send({ message: "Registered Successfully" }))
		.catch(err => {
			console.error("Error in saving: ", err)
			return res.status(500).send({ error: "Error in save"})
		});
	}

};



// [SECTION] User authentication
module.exports.loginUser = (req, res) => {
	if(req.body.email.includes("@")){
		return User.findOne({ email: req.body.email })
		.then(result => {
			// User does not exist
			if(result == null){
				return res.status(404).send({ error: "No Email Found" });
			// User exists
		} else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)
			if(isPasswordCorrect){
				return res.status(200).send({ access: auth.createAccessToken(result) })
			} else {
				return res.status(401).send({ message: "Email and password do not match" });
			} 
		}
	})
		.catch(err => {
			console.log("Error in find: ", err);
			res.status(500).send({ error: "Error in find"});
		});
	} else {
		return res.status(400).send({error: "Invalid Email"});
	}
};



//[SECTION] Retrieve user details
module.exports.getProfile = (req, res) => {
	const userId = req.user.id;
	User.findById(userId)
	.then(user => {
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		user.password = undefined;
		return res.status(200).send({ user });
	})
	.catch(err => {
		console.error("Error in fetching user profile", err)
		return res.status(500).send({ error: 'Failed to fetch user profile' })
	});
};

// [SECTION] Set user as admin (Admin only)
module.exports.updateUserAsAdmin = async (req, res) => {
	try {
		const userId = req.body.userId;
		if (!userId) {
			return res.status(400).json({ message: "User ID is required in the request body." });
		}
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}
		if (!req.user || !req.user.isAdmin) {
			return res.status(403).json({ message: "Only admin users can perform this action." });
		}
		user.isAdmin = true;
		await user.save();
		return res.json({ message: "User updated as admin successfully." });
	} catch (error) {
		console.error("Error updating user as admin:", error);
		return res.status(500).json({ error: "An error occurred while updating user as admin." });
	}
};



// [SECTION] Update password
module.exports.updatePassword = async (req, res) => {
	try {
	  const { newPassword } = req.body;
	  const { id } = req.user;
  
	  // Password Length Validation
	  if (newPassword.length < 8) {
		return res.status(400).send({ message: "Password must be atleast 8 characters" });
	  }
  
	  // Hash the password
	  const hashedPassword = await bcrypt.hash(newPassword, 10); 
  
	  // Update the user's password
	  await User.findByIdAndUpdate(id, { password: hashedPassword });
  
	  res.status(200).json({ message: 'Password updated successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
  };



// [SECTION] Update Profile
module.exports.updateProfile = async (req, res) => {
  try {
	console.log('Request Body:', req.body);
    const { newFirstName, newLastName, newMobileNo } = req.body;
	
    // Validation for mobile number
    if (newMobileNo.length !== 11) {
		return res.status(400).json({ message: 'Mobile number invalid' });
	  }

    // Database Interaction
    const user = await User.findById(req.user.id); 
    user.firstName = newFirstName;
    user.lastName = newLastName;
    user.mobileNo = newMobileNo;
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



