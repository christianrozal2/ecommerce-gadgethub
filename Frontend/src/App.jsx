import React, { useEffect, useState } from 'react';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Home from './pages/Home';
import Profile from './components/Profile';
import ProductView from './pages/ProductView';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Footer from './components/Footer';
import { features } from './constants/constants';
import FeatureCard from './components/FeatureCard';
import Checkout from './components/Checkout';

export default function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  };

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    fetch(`http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (typeof data.user !== 'undefined') {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      })
      .catch(error => console.log('Fetch error: ' + error));
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <div>
            <Navbar />
          </div>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<Error />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products/:productId" element={<ProductView />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-orders" element={<Orders />} />
            </Routes>
          </div>

          <div className='mt-36'>
            <div className='container px-0 py-20'>
              <div className='flex justify-between'>
                {features.map ((index) =>
                  <FeatureCard key={index.id} card={index} />
                )}
              </div>
            </div>
          </div>
          <div className="bg-black p-5">
            <Footer />
          </div>

        </div>
      </Router>
    </UserProvider>
  );
}
