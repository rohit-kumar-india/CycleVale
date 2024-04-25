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
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
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
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
        <div className="mb-8">
          <p className="text-gray-600 mb-2">{`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`}</p>
          <p className="text-gray-600">{`Order ID: ${orderId}`}</p>
        </div>
        <div className="border-b mb-8">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <p className="text-gray-600">{`${order.shippingDetails.name}, ${order.shippingDetails.address}, ${order.shippingDetails.city}, ${order.shippingDetails.state}, ${order.shippingDetails.country}, ${order.shippingDetails.zipCode}`}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          {order.products.map(product => (
            <div key={product._id} className="flex items-center border-b py-4">
              <img src={product.imageUrl} alt={product.name} className="h-20 w-20 mr-4 rounded-md" />
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-gray-600">{`Quantity: ${product.quantity}`}</p>
                <p className="text-gray-600">{`Price: $${product.price.toFixed(2)}`}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
          <p className="text-gray-600">{`Payment Method: ${order.paymentDetails.method}`}</p>
          <p className="text-gray-600">{`Total Amount Paid: $${order.totalAmount.toFixed(2)}`}</p>
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
