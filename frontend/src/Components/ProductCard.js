import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { HeartIcon as HeartOutline } from '@heroicons/react/outline'; // For the hollow heart
import { HeartIcon as HeartSolid } from '@heroicons/react/solid'; // For the filled heart
import { toast } from 'react-toastify';


const ProductCard = ({ Product }) => {
  const wishlistId = null;
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(Product);
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [dynamicText, setDynamicText] = useState('');
  const [wishlistItems, setWishlistItems] = useState(['66123921333320dfc5c3c8e0',]);
  const currentDate = new Date();
  const isDiscountActive = product.discountPercentage > 0 && currentDate >= new Date(product.discountStart) && currentDate <= new Date(product.discountEnd);
  const discountedPrice = isDiscountActive ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) : product.price;

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

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

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    setUserId(userId);
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      setDynamicText('Removing from Wishlist...');
      setProcessing(true);
      const response = await axiosInstance.delete('/api/wishlists/item', { data: { userId, wishlistId, productId } });
      console.log(response);
      toast.success("removed from Wishlist", toastOptions)
      // const updatedWishlistItems = wishlistItems.filter(item => item !== productId);
      // setWishlistItems(updatedWishlistItems);
      // product.wishlisted = false;
      setProduct({ ...product, wishlisted: false });
      //console.log(product);
      //fetchCartDetails(id);
    } catch (error) {
      console.error('Failed to delete item from cart', error);
    } finally {
      setProcessing(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      setDynamicText('Adding to Wishlist...');
      setProcessing(true);
      const response = await axiosInstance.post('/api/wishlists/item', { userId, wishlistId, productId });
      toast.success("added to Wishlist", toastOptions)
      setProduct({ ...product, wishlisted: true });
      // const updatedCartItems = cartItems.filter(item => item.product !== productId);
      //setWishlistItems([...wishlistItems, productId]);
      //product.wishlisted = true;
      //console.log(product);
      //fetchCartDetails(id);
    } catch (error) {
      console.error('Failed to delete item from cart', error);
    } finally {
      setProcessing(false);
    }
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent link navigation
    if (!userId) {
      router.push('/Login');
    }
    else if (product.wishlisted) {
      removeFromWishlist(product._id);

    } else {
      addToWishlist(product._id);

    }
  };

  const isWishlisted = (productId) => {
    // Assuming wishlistItems is an array of product IDs stored in state
    console.log(wishlistItems);
    return wishlistItems.includes(productId);
    //return false;
  };

  return (
    <>
    <Link href={`/products/${product._id}`} className="transform overflow-hidden h-fit hover:shadow-lg bg-white duration-200 hover:scale-105 cursor-pointer relative">
      <div className="absolute right-2 top-2 z-10">
        <button onClick={handleWishlistToggle} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition duration-250 ease-in-out">
          {product.wishlisted ? (
            <HeartSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartOutline className="h-6 w-6 text-red-500" />
          )}
        </button>
      </div>
      <img src={product.imageURLs[0] ? product.imageURLs[0] : '/images/cyclefront2.jpeg'}
        alt="Product image"
        className="w-full px-5 h-[250px] object-contain"
      />
      <div className="px-5 py-3 text-black/[0.9]">
        <h2 className="font-bold text-md text-gray-500" >{product.brand}</h2>
        <h2 className="font-semibold text-md mb-1" >{product.name.substring(0, 60)}...</h2>
        <div className="flex items-center mb-1">
          <span className="ml-1 text-sm">{product.rating}</span>
          <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
          <span className="ml-1 text-sm"> ({product.numReviews} Reviews)</span>
        </div>
        <div className="flex items-center text-black/[0.8]">
          {product.discountPercentage > 0 && currentDate >= new Date(product.discountStart) && currentDate <= new Date(product.discountEnd) ? (
            <>
              <p className="mr-2 text-md font-bold">₹{(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</p>
              <p className="text-base font-medium line-through"> ₹{product.price} </p>
              <p className="ml-2 text-base font-medium text-green-500"> {product.discountPercentage}% off</p>
            </>

          ) : (
            <p className="mr-2 text-md font-semibold">₹{product.price}</p>
          )}
        </div>
      </div>

      
    </Link>
    {/* Processing popup */}
    {processing && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
              <div className="text-white text-lg ml-4">{dynamicText}</div>
            </div>
          )}
    </>
  )
}

export default ProductCard 