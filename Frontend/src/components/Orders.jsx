import React, { useState, useEffect } from 'react';

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
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.totalPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ul className="list-disc">
                  {order.productsOrdered.map((product, index) => (
                    <li key={index}>{product.name} - Quantity: {product.quantity}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
