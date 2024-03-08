// [SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");
const {verify, verifyAdmin, isLoggedIn} = require("../auth");

// [SECTION] Routing Component
const router = express.Router();


// [SECTION] User Registration
router.post("/", userController.registerUser);


// [SECTION] User Authentication
router.post("/login", userController.loginUser);


// [SECTION] Retrieve User Details
router.get("/details", verify, userController.getProfile);


// [SECTION] Update User as Admin
router.put("/:userId/set-as-admin", verify, verifyAdmin, userController.updateUserAsAdmin);


// [SECTION] Update Password
router.post('/update-password', verify, userController.updatePassword);

// [SECTION] Update Profile
router.put('/update-profile', verify, userController.updateProfile);





// [SECTION] Export Route System
// Allows us to export the "router" object that will be accessed in our "index.js" file
module.exports = router;