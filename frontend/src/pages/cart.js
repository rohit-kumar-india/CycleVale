import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import OrderSummary from '@/Components/OrderSummary';
import { toast } from 'react-toastify';

const cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');
  const [id, setId] = useState('');
  const router = useRouter();

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const fetchCartDetails = async (id) => {
    try {
      setDynamicText('Fetching Cart Items...');
      setProcessing(true);
      const cartResponse = await axios.get(`http://localhost:5000/api/carts/${id}`);
      const cartData = cartResponse.data.cart;
      const productDetails = await Promise.all(cartData.items.map(async (item) => {
        const productResponse = await axios.get(`http://localhost:5000/api/products/${item.product}`);
        return {
          ...item,
          productDetails: productResponse.data.product,
        };
      }));
      setCartItems(productDetails);
      setId(id);

    } catch (error) {
      console.error('Failed to fetch cart or product details', error);
    } finally {
      setProcessing(false);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      setDynamicText('Removing Item...');
      setProcessing(true);
      const response = await axios.delete(`http://localhost:5000/api/carts/${id}/${productId}`);

      if (response.status === 200) {
        const updatedCartItems = cartItems.filter(item => item.product !== productId);
        setCartItems(updatedCartItems);
        toast.success("Product removed from Cart", toastOptions)
      }
    } catch (error) {
      console.error('Failed to delete item from cart', error);
    } finally {
      setProcessing(false);
    }
  }

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.warning("Minimum quantity is 1", toastOptions)
      console.log("Minimum quantity is 1");
      return;
    }
    // API call to update quantity in the database
    try {
      setDynamicText('Updating Item Quantity...');
      setProcessing(true);
      await axios.patch(`http://localhost:5000/api/carts/${id}/${productId}`, { quantity: newQuantity });

      // Update quantity in the state/UI
      const updatedCartItems = cartItems.map(item => {
        if (item.product === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      toast.success(`Quantity is updated to ${newQuantity}`, toastOptions)

    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/Login')
    } else {
      let id = localStorage.getItem('userId');
      fetchCartDetails(id);
    }
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.productDetails.price * item.quantity, 0);
  const currentDate = new Date();
  const discountPrice = cartItems.reduce((totalD, item) =>
    totalD + ((item.productDetails.discountPercentage > 0 && currentDate >= new Date(item.productDetails.discountStart) && currentDate <= new Date(item.productDetails.discountEnd)) ? item.productDetails.price * item.productDetails.discountPercentage / 100 * item.quantity : 0), 0);

  return (
    <div className="mt-[60px] container max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row shadow-md my-10">
        {/* Left Panel - Product Details */}
        <div className="md:w-3/4 flex-grow bg-white px-10 py-10">
          {/* Header */}
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          {/* Product List */}
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {/* Map through cart items here */}
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              {/* Product Image and Details */}
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24 object-contain" src={item.productDetails.imageURLs[0]} alt={item.productDetails.name} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.productDetails.brand}</span>
                  <span className="font-semibold text-sm max-w-60">{item.productDetails.name}</span>
                  <a onClick={() => deleteCartItem(item.product)} className="font-semibold text-red-500 hover:font-bold text-xs cursor-pointer">Remove</a>
                </div>
              </div>
              {/* Quantity */}
              <div className="flex justify-center w-1/5">
                <button
                  className="text-xl font-semibold hover:bg-gray-200 border border-slate-300 rounded-full px-2.5"
                  onClick={() => updateQuantity(item.product, item.quantity - 1)}>-</button>
                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  value={item.quantity}
                  readOnly />
                <button
                  className="text-xl font-semibold hover:bg-gray-200 border border-slate-300 rounded-full px-2"
                  onClick={() => updateQuantity(item.product, item.quantity + 1)}>+</button>
              </div>
              {/* Price */}
              <span className="text-center w-1/5 font-semibold text-sm">₹{item.productDetails.price}</span>
              {/* Total */}
              <span className="text-center w-1/5 font-semibold text-sm">₹{(item.productDetails.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

        </div>

        {/* Right Panel - Pricing Details */}
        <OrderSummary TotalPrice={totalPrice} DiscountPrice={discountPrice} itemNo={cartItems.length} page={"cart"} />
      </div>
      {/* Processing popup */}
      {processing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          <div className="text-white text-lg ml-4">{dynamicText}</div>
        </div>
      )}
    </div>
  );
};

export default cart