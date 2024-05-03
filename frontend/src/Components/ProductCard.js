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
  const [wishlistItems, setWishlistItems] = useState(['66123921333320dfc5c3c8e0',]);
  const currentDate = new Date();
  const isDiscountActive = product.discountPercentage > 0 && currentDate >= new Date(product.discountStart) && currentDate <= new Date(product.discountEnd);
  const discountedPrice = isDiscountActive ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) : product.price;

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
      const response = await axios.delete('http://localhost:5000/api/wishlists/item', { data: { userId, wishlistId, productId } });
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
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/wishlists/item', { userId, wishlistId, productId });
      console.log(response);
      toast.success("added to Wishlist", toastOptions)
      setProduct({ ...product, wishlisted: true });
      // const updatedCartItems = cartItems.filter(item => item.product !== productId);
      //setWishlistItems([...wishlistItems, productId]);
      //product.wishlisted = true;
      //console.log(product);
      //fetchCartDetails(id);
    } catch (error) {
      console.error('Failed to delete item from cart', error);
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
    <Link href={`/products/${product._id}`} className="transform overflow-hidden hover:shadow-lg bg-white duration-200 hover:scale-105 cursor-pointer relative">
      <div className="absolute right-2 top-2 z-10">
        <button onClick={handleWishlistToggle} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition duration-250 ease-in-out">
          {product.wishlisted ? (
            <HeartSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartOutline className="h-6 w-6 text-red-500" />
          )}
        </button>
      </div>
      <img src={product.imageURLs[0] ? product.imageURLs[0] : '/images/cyclefront2.jpeg'} alt="Product image" className="w-full px-5" />
      <div className="p-4 text-black/[0.9]">
        <h2 className="font-bold text-xl mb-1" >{product.name}</h2>
        <div className="flex items-center mb-1">
          <span className="ml-1 text-sm">{product.rating}</span>
          <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
          <span className="ml-1 text-sm"> ({product.numReviews} Reviews)</span>
        </div>
        <div className="flex items-center text-black/[0.7]">
          {product.discountPercentage > 0 && currentDate >= new Date(product.discountStart) && currentDate <= new Date(product.discountEnd) ? (
            <>
              <p className="mr-2 text-lg font-semibold">₹{(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</p>
              <p className="text-base  font-medium line-through"> ₹{product.price} </p>
              <p className="ml-2 text-base font-medium text-green-500"> {product.discountPercentage}% off</p>
            </>

          ) : (
            <p className="mr-2 text-lg font-semibold">₹{product.price}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard 