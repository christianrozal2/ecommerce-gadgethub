import { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { feat1, logout, pass, profile, user1 } from '../assets/assets';
import UpdateProfile from './UpdateProfile';
import ResetPassword from './ResetPassword';
import Orders from './Orders';

export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});
    const [showUpdateProfile, setShowUpdateProfile] = useState(true); // Set the default view to Update Profile
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/logout"); // Redirect to logout route
            }
        });
    };

    useEffect(() => {
        fetch(`/${import.meta.env.VITE_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (typeof data.user !== "undefined") {
                    setDetails(data.user);
                } else if (data.error === "User not found") {
                    Swal.fire({
                        icon: 'error',
                        title: 'User not found',
                        text: 'Something went wrong, kindly contact us for assistance.'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: 'Something went wrong, kindly contact us for assistance.'
                    })
                }
            })
    }, []);

    return (
        (user.id === null) ?
            <Navigate to="/" />
            :
            <div className='container px-0 mt-20'>
                <h2 className='text-3xl font-bold'>My Profile</h2>
                <div className='flex gap-20'>
                    <div className='flex flex-col gap-12 border p-5 rounded-md w-[30%] mt-10 text-lg'>
                        <div className='flex gap-5'>
                            <img src={profile} alt="profile" />
                            <div className='flex flex-col justify-center'>
                                <p className='font-bold'>Taylor Swift</p>
                                <p>taylor@mail.com</p>
                            </div>
                        </div>
                        <button className='flex gap-5' onClick={() => { setShowUpdateProfile(true); setShowResetPassword(false); setShowOrders(false); }}>
                            <img src={user1} alt="user1" />
                            <p>Personal Information</p>
                        </button>
                        <button className='flex gap-5' onClick={() => { setShowResetPassword(true); setShowUpdateProfile(false); setShowOrders(false); }}>
                            <img src={pass} alt="password" className='size-5'/>
                            <p>Reset Password</p>
                        </button>
                        <button className='flex gap-5' onClick={() => { setShowOrders(true); setShowUpdateProfile(false); setShowResetPassword(false); }}>
                            <img src={feat1} alt="orders" />
                            <p>My Orders</p>
                        </button>
                        <button className='flex gap-5' onClick={handleLogout}>
                            <img src={logout} alt="logout" />
                            <p>Logout</p>
                        </button>
                    </div>
                    <div className='w-[70%] mt-10'>
                        {showUpdateProfile && <UpdateProfile />}
                        {showResetPassword && <ResetPassword />}
                        {showOrders && <Orders />}
                    </div>
                </div>
            </div>
    )
}
