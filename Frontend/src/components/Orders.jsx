import React, { useState, useEffect } from 'react';
import { p1 } from '../assets/assets';
import { Link } from 'react-router-dom';

const Orders = ({ userId, isAdmin }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(isAdmin
          ? `${import.meta.env.VITE_API_BASE_URL}/order/all-orders`
          : `${import.meta.env.VITE_API_BASE_URL}/order/my-orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const responseData = await response.json();
        setOrders(responseData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId, isAdmin]);

  return (
    <div className="container px-0 mx-auto">
      <h2 className="text-2xl font-bold mb-10 border-b-2 pb-3">Order History</h2>
        <div className='flex flex-col gap-10'>
          {orders.map((order) => (
            <div key={order._id} className='pb-10 border-b-2 flex flex-col gap-5'>
              <h2 className="font-bold text-xl">Order {order._id}</h2>
              <p className='text-gray-700'>Order ID: {order._id}</p>
              <p className='text-gray-700'>Ordered On: {order.orderedOn}</p>
                <div>
                  {order.productsOrdered.map((product) => (
                    <div key={product.productId}>
                      <Link to={`/products/${product.productId}`} className='flex gap-10 items-center hover:bg-container p-4'>
                        <img src={p1} alt='p1' className='size-24'/>
                        <div>
                          <p className='font-bold'>{product.name}</p>
                          <p className='text-gray-700'>Quantity: {product.quantity}</p>
                          <p className='text-gray-700'>Subtotal: ₱{product.subtotal}.00</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                 <h3 className='font-bold text-lg text-end'>Total: ₱{order.totalPrice}.00</h3>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Orders;
