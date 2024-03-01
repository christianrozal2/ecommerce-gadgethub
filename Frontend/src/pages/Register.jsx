import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import Button from '../components/Button';

export default function Register() {
	const { user } = useContext(UserContext);
	// State hooks to store the values of the input fields
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate(); 

	// Check if the values are successfully binded
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(mobileNo);
	console.log(password);
	console.log(confirmPassword);

	function registerUser(e) {
		// Prevents page redirection via form submission
		e.preventDefault();

		fetch(`${REACT_APP_API_BASE_URL}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				// data is the response of the api/server after it's been process as JS object through our res.json() method.
				console.log(data);
				// data will only contain an email property if we can properly save our user.
				if (data.message === 'Registered Successfully') {
					setFirstName('');
					setLastName('');
					setEmail('');
					setMobileNo('');
					setPassword('');
					setConfirmPassword('');

					Swal.fire('Success', 'Registration successful', 'success');
					navigate('/login');
				} else if (data.error === 'Email invalid') {
					Swal.fire('Error', 'Email is invalid', 'error');
				} else if (data.error === 'Mobile number invalid') {
					Swal.fire('Error', 'Mobile number is invalid', 'error');
				} else if (data.error === 'Password must be atleast 8 characters') {
					Swal.fire('Error', 'Password must be at least 8 characters', 'error');
				} else {
					Swal.fire('Error', 'Something went wrong.', 'error');
				}
			});
	}

	// useEffect() has two arguments, function and dependency
	// function - represents the side effect you want to perform. This will be executed when the component renders.
	// dependency - optional array. The effect will run when there are changes in the component's dependencies. When there is no provided array, the effect will run on every render of the component.
	useEffect(() => {
		if (
			firstName !== '' &&
			lastName !== '' &&
			email !== '' &&
			mobileNo !== '' &&
			password !== '' &&
			confirmPassword !== '' &&
			password === confirmPassword
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [firstName, lastName, email, mobileNo, password, confirmPassword]);

	return user.id !== null ? (
		<Navigate to="/" />
	) : (
		<div className='flex'>

			<div className='backgroundImage' />

			<div className='w-[50%] px-10 flex flex-col items-center justify-center text-sm'>
				<form className='lg:min-w-[400px]' onSubmit={(e) => registerUser(e)}>
					<h1 className='text-3xl font-bold'>Create Account</h1>
					<p className='text-lg text-text1'>Please enter details</p>
					<div className='mt-5'>
						<label htmlFor="firstName">First Name</label><br/>
						<input
							type="text"
							id="firstName"
							className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
							placeholder="Enter First Name"
							required
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						/>
					</div>
					<div className='mt-3'>
						<label htmlFor="lastName">Last Name</label><br/>
						<input
							type="text"
							id="lastName"
							className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
							placeholder="Enter Last Name"
							required
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>
					</div>
					<div className='mt-3'>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
							placeholder="Enter Email"
							required
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<div className='mt-3'>
						<label htmlFor="mobileNo">Mobile No</label>
						<input
							type="number"
							id="mobileNo"
							className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
							placeholder="Enter 11 Digit No."
							required
							value={mobileNo}
							onChange={(e) => {
								setMobileNo(e.target.value);
							}}
						/>
					</div>
					<div className='mt-3'>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
							placeholder="Enter Password"
							required
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className='mt-3'>
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							type="password"
							id="confirmPassword"
							className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
							placeholder="Confirm Password"
							required
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</div>
					<div className='flex justify-between items-center mt-5'>
						{/*conditionally render submit button based on isActive state, the current state of the isActive is false*/}
						{isActive ? (
							<Button label="SIGN UP" type="submit" />
						) : (
							<Button label="SIGN UP" type="submit" disabled />
						)}
						<Link to="/login">
                            <p>Already have an account?</p>
                        </Link>
					</div>
				</form>
			</div>
		</div>
	);
}