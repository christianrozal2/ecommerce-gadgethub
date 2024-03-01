import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { close1, del, p1 } from '../assets/assets';
import Swal from 'sweetalert2';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState({});
  const totalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      // Find the item in the cart
      const itemToUpdate = cartItems.find(item => item._id === itemId);
      if (!itemToUpdate) {
        throw new Error('Item not found in cart');
      }
  
      // Calculate the new subtotal based on the product price and new quantity
      const newSubtotal = products[itemToUpdate.productId]?.price * newQuantity;
  
      // Update the quantity and subtotal locally
      const updatedCartItems = cartItems.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: newQuantity, subtotal: newSubtotal };
        }
        return item;
      });
      setCartItems(updatedCartItems);
  
      // Send a request to update the quantity on the server
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/update-cart-quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: itemToUpdate.productId,
          quantity: newQuantity,
          subtotal: newSubtotal
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity on server');
      }
      const responseData = await response.json();
      console.log('Quantity updated on server:', responseData);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove product from cart');
      }
      const responseData = await response.json();
      console.log('Product removed from cart:', responseData);
      setCartItems(prevCartItems => prevCartItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      // Show confirmation alert
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will clear your cart. Are you sure you want to proceed?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear it!'
      });
  
      // If user confirms, proceed to clear the cart
      if (result.isConfirmed) {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/clear-cart`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to clear cart');
        }
        const responseData = await response.json();
        console.log('Cart cleared:', responseData);
        setCartItems([]); // Clear cart items locally
        Swal.fire('Success!', 'Your cart has been cleared.', 'success');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      Swal.fire('Error!', 'Failed to clear cart. Please try again later.', 'error');
    }
  };
  
  
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/get-cart`, {
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
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const responseData = await response.json();
        console.log('Product Data:', responseData.products); // Logging the products array
        // Convert products array to object for easier access
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

  return (
    <div className='container px-0 mt-20'>
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {user && (
          <div className="mb-4">
            <p>User: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className='flex gap-10'>
            <div className='w-[70%]'>
              <div className='grid grid-cols-4 mt-10 border-b pb-3 gap-10'>
                <h2 className='font-semibold text-gray-700 col-span-2'>Products</h2>
                <h2 className='font-semibold text-gray-700'>Quantity</h2>
                <h2 className='font-semibold text-gray-700'>Subtotal</h2>
              </div>
              {cartItems.map((item) => (
                <div key={item._id} className="grid grid-cols-4 mt-5 gap-10">
                  <div className='flex gap-3 col-span-2'>
                    <div className='bg-container p-4'>
                      <img src={p1} alt="p1" className='w-10 min-w-10'/>
                    </div>
                    <div className='truncate flex flex-col justify-center'>
                      <Link to={`/products/${item.productId}`}>
                        <p className='font-bold truncate hover:text-gray-400'>{products[item.productId]?.name}</p>
                      </Link>
                      <p>₱{products[item.productId]?.price}.00</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className='flex gap-5 items-center border rounded-md'>
                      <button className='px-3 py-1 text-2xl' onClick={() => handleQuantityChange(item._id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                      <span>{item.quantity}</span>
                      <button className='px-3 py-1 text-lg' onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className='flex items-center justify-between mr-5'>
                    <p>₱{item.subtotal}.00</p>
                    <button className="cursor-pointer" onClick={() => handleRemoveFromCart(item.productId)}>
                      <img src={del} alt="del" />
                    </button>
                  </div>
                </div>
              ))}
              
            </div>

            <div className='w-[30%]'>
              <div className='border rounded-md p-5 mt-10'>
                <p className='font-bold border-b pb-5'>Summary</p>
                <div className='flex justify-between mt-5 border-b pb-5'>
                  <p>Total Price</p>
                  <p>₱{totalPrice.toFixed(2)}</p>
                </div>
                <div className='flex justify-between mt-5 border-b pb-5'>
                  <p>Shipping Fee</p>
                  <p>₱0.00</p>
                </div>
                <div className='flex justify-between mt-5'>
                  <p className='font-bold'>Grand Total</p>
                  <p className='font-bold'>₱{(totalPrice + 0).toFixed(2)}</p>
                </div>
              </div>

              <div className='mt-5'>
                <Link to='/checkout'>
                  <Button label='Proceed to Checkout' className='w-full'/>
                </Link>
              </div>
            </div>
          </div>
          
        )}
      </div>
                
      {cartItems.length > 0 && (
        <button className="bg-white border-2 hover:bg-gray-300 text-gray-700 font-semibold 
        py-2 px-4 rounded mt-10 flex gap-2 items-center" onClick={handleClearCart}>
          Clear Cart
          <img src={close1} alt="clear" className='size-3' />
        </button>
      )}

      <div className='bg-container p-10 flex gap-10 justify-between mt-36 rounded-md'>
        <div className='w-[70%]'>
          <h2 className='text-3xl'>Continue Shopping</h2>
          <p className='mt-5'>Discover more products in our vast selection of cutting-edge gadgets, innovative smart home devices, stylish accessories, and premium electronics, catering to every tech enthusiast's needs and desires.</p>
        </div>
        <div className='flex items-center'>
          <Link to='/products'>
            <Button label='Continue Shopping' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
