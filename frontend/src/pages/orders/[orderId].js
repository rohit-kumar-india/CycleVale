// pages/orders/[orderId].js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
//import Layout from '../../components/Layout';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const { orderId } = router.query; // Get the ID from the URL

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, []);

  const fetchOrderDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!order) {
    return (
      //<Layout>
        <div className="container mx-auto mt-8 text-center">
          <p>Loading...</p>
        </div>
      //</Layout>
    );
  }

  return (
    //<Layout>
      <div className="mt-[60px] max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
        <div className="mb-8">
          <p className="text-gray-600 mb-2">{`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`}</p>
          <p className="text-gray-600">{`Order ID: ${orderId}`}</p>
        </div>
        <div className="border-y  p-6">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <p className="text-gray-600 ml-4">{`${order.shippingDetails.name}, ${order.shippingDetails.mobile}` }</p>
          <p className="text-gray-600 ml-4">{`${order.shippingDetails.address}, ${order.shippingDetails.city}, ${order.shippingDetails.state}, ${order.shippingDetails.country}, ${order.shippingDetails.pincode}`}</p>
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
