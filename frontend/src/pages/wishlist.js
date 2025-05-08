import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductCard from '@/Components/ProductCard';

const Wishlist = () => {
  const [userId, setUserId] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  const fetchWishlistDetails = async (id) => {
    //setIsLoading(true); // Assuming you have an isLoading state to manage UI loading feedback

    try {
      setDynamicText('Fetching Wishlists...');
      setProcessing(true);
      // Fetch the user's wishlist
      const wishlistResponse = await axiosInstance.get(`/api/users/${id}/wishlists`);
      const wishlists = wishlistResponse.data;

      // Map over each wishlist to fetch details for all products in each list
      const detailedWishlists = await Promise.all(wishlists.map(async (wishlist) => {
        const detailedItems = await Promise.all(wishlist.items.map(async (item) => {
          const productResponse = await axiosInstance.get(`/api/products/${item.product}`);
          return {
            ...item,
            productDetails: {
              ...productResponse.data.product,
              wishlisted: true // Adding the new field here
            }
            //productResponse.data.product
          };
        }));

        return { ...wishlist, items: detailedItems };
      }));

      setWishlists(detailedWishlists); // Assuming you have a state setter for wishlists
      setSelectedWishlist(detailedWishlists[0]);
    } catch (error) {
      console.error('Failed to fetch wishlist or product details', error);
    } finally {
      setProcessing(false);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/Login')
    } else {
      const userId = localStorage.getItem('userId');
      fetchWishlistDetails(userId);
      setUserId(userId);
    }
  }, []);

  const createWishlist = async () => {
    try {
      setDynamicText('Creating Wishlist...');
      setProcessing(true);
      const newName = prompt('Wishlist name:');
      if (newName) {

        let response = await axiosInstance.post('/api/users/wishlist', { userId, wishlistName: newName });
        console.log(response);

        setWishlists(response.data.wishlists);
        console.log(wishlists);
        console.log(response.data.wishlists);
      }
    } catch (error) {
      console.error("Failed to add Wishlist", error);
    } finally {
      setProcessing(false);
    }
  };

  const removeProduct = (productId) => {
    const updatedWishlist = { ...selectedWishlist, products: selectedWishlist.products.filter(product => product.id !== productId) };
    setSelectedWishlist(updatedWishlist);

    const updatedWishlists = wishlists.map(wl => wl.id === selectedWishlist.id ? updatedWishlist : wl);
    setWishlists(updatedWishlists);
  };

  const addToCart = (productId) => {
    console.log(`Adding product ${productId} to cart`);
    // Implement adding to cart logic here
  };

  return (
    <div className="mt-[60px] flex max-w-7xl mx-auto">
      {/* Wishlist Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 sticky top-[60px] h-screen overflow-y-auto">
        <h2 className="font-semibold border-b text-2xl mb-4 p-6">My Wishlists</h2>
        <ul>
          {wishlists.map(wishlist => (
            <li key={wishlist._id}
              className={`p-2 m-4 cursor-pointer ${selectedWishlist._id === wishlist._id ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setSelectedWishlist(wishlist)}>
              {wishlist.name}
            </li>
          ))}
        </ul>
        <button className="m-4 p-2 bg-green-500 text-white rounded" onClick={createWishlist}>Create New Wishlist</button>
      </div>

      {/* Right Section */}
      <div className="w-3/4 bg-white p-5 flex-grow overflow-y-auto" >
        {selectedWishlist === null ? (
          <p>Wishlist not found.</p>
        ) : (
          <>
            {/* Products List */}

            <h2 className="font-semibold text-2xl mb-4 pt-4">&gt; {selectedWishlist.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedWishlist.items.map(item => (
                <ProductCard key={item._id} Product={item.productDetails} />
              ))}
            </div>
            {/* <div className="grid grid-cols-3 gap-4">
          {console.log(selectedWishlist)}
          {selectedWishlist.items.map(item => (
            <div key={item.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{item.name?item.name:"rohit"}</h3>
              <div className="flex justify-between mt-3">
                <button className="bg-red-500 text-white p-2 rounded" onClick={() => removeProduct(item.id)}>Remove</button>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => addToCart(item.id)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div> */}

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
    </div>
  );
};

export default Wishlist