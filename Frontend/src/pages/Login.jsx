import { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import Button from '../components/Button';
import { log } from '../assets/assets';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.access !== "undefined") {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access)
                Swal.fire({
                    title: 'Login Successful',
                    icon: 'success',
                    text: 'Welcome to Gadget Hub!'
                })
                console.log(`ID: ${user._id}`)
            } else if (data.error === "No Email Found") {
                Swal.fire({
                    title: 'Email not found',
                    icon: 'error',
                    text: 'Check the email you provided.'
                })
            } else {
                Swal.fire({
                    title: 'Authentication Failed',
                    icon: 'error',
                    text: 'Check your login details and try again.'
                })
            }
        })
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            })
        })
    };

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return (
        (user.id !== null) ?
            <Navigate to="/" />
        :
        <div className="flex-grow md:px-14 sm:px-12 px-6">
            <div className='flex container px-0 lg:mt-20 sm:mt-16 mt-12'>
                <div className='sm:w-[50%] w-full sm:flex hidden'>
                    <img src={log} alt="login" />
                </div>

                <div className='sm:w-[50%] w-full flex flex-col items-center justify-center text-sm'> 
                    <form className='w-full lg:px-20 md:px-16 sm:px-12' onSubmit={(e) => authenticate(e)}>
                        <h1 className='text-3xl font-bold'>Welcome</h1>
                        <p className='text-lg text-text1'>Please login here</p>
                        <div className='mt-5'>
                            <label htmlFor="userEmail">Email address</label><br/>
                            <input
                                type="email"
                                className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
                                id="userEmail"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className='mt-3'>
                            <label htmlFor="password">Password</label><br/>
                            <input
                                type="password"
                                className="border-2 border-text1 rounded-lg p-2 mt-1 w-full"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mt-5 flex justify-between items-center'>
                            {isActive ?
                                <Button label='SIGN IN' type="submit" />
                            :
                                <Button label='SIGN IN' type="submit" disabled />
                            }
                            <Link to="/register">
                                <p>Create an account?</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
