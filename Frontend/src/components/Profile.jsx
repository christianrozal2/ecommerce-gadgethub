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
        fetch(`${import.meta.env.VITE_API_BASE_URL}/users/details`, {
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
            <div className="flex-grow md:px-14 sm:px-12 px-6">
                <div className='container px-0 lg:mt-20 sm:mt-16 mt-12'>
                    <h2 className='sm:text-3xl text-2xl font-bold sm:text-left text-center'>My Profile</h2>
                    <div className='flex sm:flex-row flex-col md:gap-20 gap-10'>
                        <div className='flex flex-col md:gap-12 gap-10 border p-5 rounded-md sm:w-[30%] sm:mt-10 mt-5 sm:text-lg overflow-hidden'>
                            <div className='flex md:gap-5 sm:gap-2 gap-5 items-center'>
                                <img src={profile} alt="profile" className='size-12'/>
                                <div className='flex flex-col justify-center'>
                                    <p className='font-bold'>{details.firstName} {details.lastName}</p> 
                                    <p>{details.email}</p> 
                                </div>
                            </div>
                            <button className='flex gap-5' onClick={() => { setShowUpdateProfile(true); setShowResetPassword(false); setShowOrders(false); }}>
                                <img src={user1} alt="user1" />
                                <p className='text-left'>Personal Information</p>
                            </button>
                            <button className='flex gap-5' onClick={() => { setShowResetPassword(true); setShowUpdateProfile(false); setShowOrders(false); }}>
                                <img src={pass} alt="password" className='size-5'/>
                                <p className='text-left'>Reset Password</p>
                            </button>
                            <button className='flex gap-5' onClick={() => { setShowOrders(true); setShowUpdateProfile(false); setShowResetPassword(false); }}>
                                <img src={feat1} alt="orders" />
                                <p className='text-left'>My Orders</p>
                            </button>
                            <button className='flex gap-5' onClick={handleLogout}>
                                <img src={logout} alt="logout" />
                                <p className='text-left'>Logout</p>
                            </button>
                        </div>
                        <div className='sm:w-[70%] sm:mt-10'>
                            {showUpdateProfile && <UpdateProfile setDetails={setDetails} />}
                            {showResetPassword && <ResetPassword />}
                            {showOrders && <Orders />}
                        </div>
                    </div>
                </div>
            </div>
    )
}
