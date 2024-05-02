// pages/orders.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
//import Layout from '../components/Layout';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('userId');
    fetchOrders(id);
  }, []);

  const fetchOrders = async (userId) => {
    try {
      setDynamicText('Fetching Your Orders...');
      setProcessing(true);
      const orderResponse = await axios.get(`http://localhost:5000/api/orders/order-history/${userId}`);
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
    } finally {
      setProcessing(false);
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
                {/* {console.log(order.items[0].product.brand)} */}
                <div className="flex items-center mb-2 px-6">
                  <img src={order.items[0].product.imageURLs[0]} alt={order.items[0].product.imageURLs[0]} className="h-16 w-16 mr-4 rounded-md" />
                  <div>
                    <p className="text-xl font-semibold">{order.items[0].product.brand}</p>
                    <p className="text-gray-600">{order.items[0].product.name}</p>
                  </div>
                  <p className="ml-auto font-semibold mr-28">{`₹${order.totalAmount.toFixed(2)}`}</p>
                </div>
                </div>
              </Link>
              </>
            ))
          )}
        </div>
        {/* Processing popup */}
        {processing && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                    <div className="text-white text-lg ml-4">{dynamicText}</div>
                </div>
            )}
      </div>
    //</Layout>
  );
};

export default Orders;
