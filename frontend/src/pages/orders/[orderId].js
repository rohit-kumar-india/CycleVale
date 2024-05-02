// pages/orders/[orderId].js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
//import Layout from '../../components/Layout';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');
  const router = useRouter();
  const { orderId } = router.query; // Get the ID from the URL

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, []);

  const fetchOrderDetails = async (id) => {
    try {
      setDynamicText('Loading Order Details...');
      setProcessing(true);
      const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setProcessing(false);
    }
  };

  // if (!order) {
  //   return (
  //     //<Layout>
  //       <div className="container mx-auto mt-8 text-center">
  //         <p>Loading...</p>
  //       </div>
  //     //</Layout>
  //   );
  // }

  return (
    //<Layout>
    <div className="mt-[60px] max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
      {order === null ? (
        <p>Order Details not found.</p>
      ) : (
        <>
          <div className="mb-8 flex justify-between">
            <div>
              <p className="text-gray-600 mb-2">{`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`}</p>
              <p className="text-gray-600">{`Order ID: ${orderId}`}</p>
            </div>
            <Link key={order._id} href={`/invoice/${orderId}`} className='pr-20'>
              <div className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Invoice</div></Link>
          </div>
          <div className="border-y  p-6">
            <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
            <p className="text-gray-600 ml-4">{`${order.shippingDetails.name}, ${order.shippingDetails.mobile}`}</p>
            <p className="text-gray-600 ml-4">{`${order.shippingDetails.address}, ${order.shippingDetails.city}, ${order.shippingDetails.state}, ${order.shippingDetails.country ? order.shippingDetails.country + ',' : ""} ${order.shippingDetails.pincode}`}</p>
          </div>
          <div className=" p-6">
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            {order.items.map(item => (
              <div key={item.product._id} className="flex items-center border-b py-4">
                <img src={item.product.imageURLs[0]} alt={item.product.name} className="h-20 w-20 mr-4 rounded-md" />
                <div>
                  <p className="text-lg font-semibold">{item.product.name}</p>
                  <p className="text-gray-600">{item.product.brand}</p>
                  <p className="text-gray-600">{`Quantity: ${item.quantity}`}</p>
                  <p className="text-gray-600">{`Price: ₹${item.purchasePrice}`}</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" p-6">
            <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
            <p className="text-gray-600 ml-4">{`Payment Method: ${order.paymentDetails.paymentMethod}`}</p>
            <p className="text-gray-600 ml-4">{`Total Amount: ₹${order.totalAmount.toFixed(2)}`}</p>
            <p className="text-gray-600 ml-4">{`Payment Status: ${order.paymentDetails.paymentStatus}`}</p>
          </div>
        </>
      )}
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

export default OrderDetails;

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  return {
    props: {
      orderId,
    },
  };
}
