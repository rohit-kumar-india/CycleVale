import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// Import your cart context or state management hook
// import { CartContext } from '../path/to/your/context';




const cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = '65db29ba433a6266a8d13f40';
  // {
  //   id: "1",
  //   name: "",
  //   image: "/images/cyclefront2.jpeg",
  //   brand: "",
  //   quantity: 0,
  //   price: 0
  // }
  const fetchCartDetails = async (id) => {
    try {
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
    } catch (error) {
      console.error('Failed to fetch cart or product details', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/carts/${id}/${productId}`);
      console.log(response);
      const updatedCartItems = cartItems.filter(item => item.product !== productId);
      setCartItems(updatedCartItems);
      //fetchCartDetails(id);
    } catch (error) {
      console.error('Failed to delete item from cart', error);
    }
  }

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      console.log("Minimum quantity is 1");
      return;
    }
    // API call to update quantity in the database
    try {
      await axios.patch(`http://localhost:5000/api/carts/${id}/${productId}`, { quantity: newQuantity });
      console.log("Quantity updated");
      // Update quantity in the state/UI
    const updatedCartItems = cartItems.map(item => {
      if (item.product === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };
  

  // console.log("hello")
  // fetchCartItems('65db29ba433a6266a8d13f40').then(setCartItems);
  useEffect(() => {


    fetchCartDetails('65db29ba433a6266a8d13f40');
    //fetchProductDetails('66123921333320dfc5c3c8e0').then(setCartItems);
    //fetchCartItems('65db29ba433a6266a8d13f40').then(setCartItems);
    //}
  }, []);

  

  if (isLoading) {
    return <div className='mt-[60px]'>Loading cart...</div>;
  }
  // Example cart items and total calculation
  // Replace this with your actual cart context or state management logic
  //const cartItems = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Perform actions on scroll
  //   setHeight(window.scrollY)


  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


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
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
          </div>
          {/* Map through cart items here */}
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              {/* Product Image and Details */}
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src='/images/cyclefront2.jpeg' alt={item.productDetails.name} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.productDetails.name}</span>
                  <span className="text-red-500 font-bold text-xs">{item.productDetails.brand}</span>
                  <a onClick={() => deleteCartItem(item.product)} className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</a>
                </div>
              </div>
              {/* Quantity */}
              <div className="flex justify-center w-1/5">
                {/* Adjust Quantity Component Here */}
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
                {/* <input className="mx-2 border text-center w-8" type="text" value={item.quantity} readOnly /> */}
              </div>
              {/* Price */}
              <span className="text-center w-1/5 font-semibold text-sm">₹{item.price}</span>
              {/* Total */}
              <span className="text-center w-1/5 font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

        </div>

        {/* Right Panel - Pricing Details */}
        <div id="summary" className='w-full md:w-1/4 px-8 py-10 transition-all duration-1000'>
          <div>
            {/* <div id="summary" className={`${height<250 ? "fixed transition-all duration-1000" : "relative transition-all duration-1000"} transition-all duration-1000`}> */}
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
              <span className="font-semibold text-sm">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - ₹10.00</option>
                {/* Additional shipping options here */}
              </select>
            </div>
            {/* More pricing details like tax, discounts, etc., can be added here */}
            <div className="py-10">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₹{(totalPrice+10).toFixed(2)}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart