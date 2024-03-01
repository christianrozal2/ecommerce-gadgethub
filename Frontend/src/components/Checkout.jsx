import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { p1 } from '../assets/assets';

const Checkout = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/cart/get-cart', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        console.log('Data from server:', data);
        if (!Array.isArray(data.cart.cartItems)) {
          throw new Error('Cart items data is not an array');
        }
        setCartItems(data.cart.cartItems);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const responseData = await response.json();
        console.log('Product Data:', responseData.products);
        const productsObject = {};
        responseData.products.forEach(product => {
          productsObject[product._id] = product;
        });
        setProducts(productsObject);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCart();
    fetchProducts();
  }, []);


  const handleCheckout = async () => {
    const confirmCheckout = await Swal.fire({
      title: 'Confirm Checkout',
      text: 'Are you sure you want to proceed with the checkout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel',
    });
  
    if (confirmCheckout.isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch('http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/order/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            userId: user ? user._id : null
          })
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Show success alert
          Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
          });
          navigate('/cart');
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during checkout:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.subtotal, 0);

  return (
    <div className='container px-0 mt-20'>
      <h2 className="text-3xl font-bold">Checkout</h2>

      <div className='grid grid-cols-4 mt-10 pb-3 gap-10'>
        <h2 className='font-semibold text-gray-700 col-span-2'>Products</h2>
        <h2 className='font-semibold text-gray-700 text-right'>Quantity</h2>
        <h2 className='font-semibold text-gray-700 text-right'>Subtotal</h2>
      </div>

      {cartItems.map((item) => (
        <div key={item._id} className="grid grid-cols-4 mt-5 gap-10">
          <div className='flex gap-3 col-span-2'>
            <div className='bg-container p-4'>
              <img src={p1} alt="product" className='w-10 min-w-10'/>
            </div>
            <div className='truncate'>
              <p className='font-bold truncate hover:text-gray-400'>{products[item.productId]?.name}</p>
              <p>₱{products[item.productId]?.price}.00</p>
            </div>
          </div>
          <div className='text-right'>  
            <p>x{item.quantity}</p>  
          </div>   
          <div className='text-right'>
            <p>₱{item.subtotal}.00</p>
          </div>
        </div>
      ))}

      <div className='flex justify-between font-bold bg-container p-5 mt-10'>
        <p>Order Total</p>
        <p>₱{totalPrice}.00</p>
      </div>
        
      <div className='flex gap-5 justify-end mt-10'>
        <Link to='/cart'>
          <button className="bg-white border-2 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md">
            Back to cart
          </button>
         </Link>
        <button
          className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
