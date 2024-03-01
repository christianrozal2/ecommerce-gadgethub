import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cart, logo, prof } from '../assets/assets';
import Button from './Button';
import UserContext from '../UserContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate(); // Add useNavigate hook

    if (location.pathname === "/register" || location.pathname === "/login") {
        return null;
    }

    return (
        <div className='container px-0 flex items-center justify-between py-4 font-semibold text-gray-700'>
            <div>
                <img src={logo} alt="logo" className='h-9'/>
            </div>
            <div className='flex gap-5 items-center text-sm sm:text-base'>
                <Link to='/' className='cursor-pointer transition duration-300 ease-in-out hover:text-gray-300'>
                    Home
                </Link>
        
                <Link to='/products' className='cursor-pointer transition duration-300 ease-in-out hover:text-gray-500'>
                    {user.isAdmin ? 'Dashboard' : 'Shop'}
                </Link>
        
                {(user.id === null) && (
                    <Link to="/register" className='cursor-pointer transition duration-300 ease-in-out hover:text-gray-500'>
                        Register
                    </Link>
                )}

                {(user.id === null)
                ?
                    <Link to="/login">
                        <Button type='primary' label='Login' />
                    </Link>
                :
                <>
                    {user.isAdmin ? null :  // Hide Orders and Cart for admins
                        <>
                            <Link to="/cart">
                                <img src={cart} alt='profile' className='cursor-pointer size-8 transition duration-300 ease-in-out hover:size-9'/>
                            </Link>
                        </>
                    }
                    <Link to="/profile">
                        <img src={prof} alt='profile' className='cursor-pointer size-8 transition duration-300 ease-in-out hover:size-9'/>
                    </Link>
                </>
                }
            </div>
        </div>
    );
};

export default Navbar;
