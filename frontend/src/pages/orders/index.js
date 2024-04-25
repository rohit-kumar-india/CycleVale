// pages/orders.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
//import Layout from '../components/Layout';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const orderResponse = await axios.get('http://localhost:5000/api/orders/order-history/65db29ba433a6266a8d13f40');
      setOrders(orderResponse.data);
      const orderData = orderResponse.data;
      console.log(orderResponse.data)
      // console.log(orderData[0]);
      // const productDetails = await Promise.all(orderData.map(async (order) => {
      //   console.log(order.items[0]);
      //   const productResponse = await axios.get(`http://localhost:5000/api/products/${order.items[0].product}`);
      //   return {
      //     ...item,
      //     productBrand: productResponse.data.product.brand,
      //     productName: productResponse.data.product.name,
      //   };
      // }));
      
      console.log(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    //<Layout>
      <div className="mt-[60px] max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold py-8">Orders History</h1>
        <div className="mx-4 px-4">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map(order => (

              <>
                <Link key={order._id} href={`/orders/${order._id}`} >
                    <div className="bg-white rounded-lg shadow-md pb-6 m-4 hover:bg-gray-100 ">
                <div className="bg-gray-200 rounded-lg flex justify-between mb-4 py-4 px-6">
                  <p className="text-gray-600">{`Date: ${new Date(order.createdAt).toLocaleDateString()}`}</p>
                  <p className="text-gray-600">{`Order #${order._id}`}</p>
                </div>
                {console.log(order.items[0].product.brand)}
                <div className="flex items-center mb-2 px-6">
                  <img src={order.items[0].product.imageURLs[0]} alt={order.items[0].product.imageURLs[0]} className="h-16 w-16 mr-4 rounded-md" />
                  <div>
                    <p className="text-xl font-semibold">{order.items[0].product.brand}</p>
                    <p className="text-gray-600">{order.items[0].product.name}</p>
                  </div>
                  <p className="ml-auto font-semibold mr-48">{`₹${order.totalAmount.toFixed(2)}`}</p>
                </div>
                </div>
              </Link>
              </>
            ))
          )}
        </div>
      </div>
    //</Layout>
  );
};

export default Orders;
