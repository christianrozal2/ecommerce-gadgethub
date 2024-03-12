import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cart, close2, logo, menu, prof } from '../assets/assets';
import Button from './Button';
import UserContext from '../UserContext';
import { useContext, useState } from 'react';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate(); // Add useNavigate hook
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (location.pathname === "/register" || location.pathname === "/login") {
        return null;
    }

    return (
        <div className='container relative px-0 flex items-center justify-between py-4 font-semibold text-gray-700'>
            <div>
                <img src={logo} alt="logo" className='sm:h-9 h-7'/>
            </div>
            <div className='sm:flex hidden gap-5 items-center text-sm sm:text-base'>
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
            <div className='flex sm:hidden'>
                <img 
                    src={isMenuOpen ? close2 : menu } 
                    alt="menu" 
                    className={isMenuOpen ? 'size-6 cursor-pointer' : 'size-7 cursor-pointer'} 
                    onClick={toggleMenu} // Add onClick handler
                /> 
            </div>
             {isMenuOpen && (
                <div className='flex flex-col sm:hidden border-2 border-gray-900 rounded-md bg-white w-[180px] p-5 absolute top-16 right-0 gap-5 items-center text-sm sm:text-base'>
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
                                <Link to="/cart" className='cursor-pointer transition duration-300 ease-in-out hover:text-gray-300'>
                                    <p>Cart</p>
                                </Link>
                            </>
                        }
                        <Link to="/profile" className='cursor-pointer transition duration-300 ease-in-out hover:text-gray-300'>
                        
                            <p>Profile</p>
                        </Link>
                    </>
                    }
                </div>
            )}
        </div>
    );
};

export default Navbar;
