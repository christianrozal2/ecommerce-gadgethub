import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';

export default function Logout(){
	// The "localStorage.clear()" method allows us to clear the information in the localStorage ensuring no information is stored in our browser
	// localStorage.clear();
	const { unsetUser, setUser } = useContext(UserContext);

	// Clear the localStorage of the user's information
	unsetUser();

	// Placing the "setUser" setter function inside of a useEffect is necessary because of updates within reactJS that a state of another component cannot be updated while trying to render a different component
	// By adding the useEffect, this will alow the Logout page to render first before triggering the useEffect which changes the state of our user
	useEffect(() => {
		// Set the user state back to it's original value
		setUser({
			id: null,
			isAdmin: null
		});
	})
	// Redirect back to login
	return (
		<Navigate to='/login' />
	)
}