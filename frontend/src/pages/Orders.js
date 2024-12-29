import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      Axios.get(`http://localhost:5000/api/orders/${userId}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);

  return (
    <div className="orders">
      <h1>My Orders</h1>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Items: {order.items.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
