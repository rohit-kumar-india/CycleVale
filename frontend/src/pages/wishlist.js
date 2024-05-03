import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductCard from '@/Components/ProductCard';

// Mock data for demonstration
const initialWishlists = [
  { id: 'wl1', name: 'Tech Gadgets', items: [{ id: 'p1', name: 'Smartphone' }, { id: 'p2', name: 'Laptop' }, { id: 'p3', name: 'Smartphone1' }, { id: 'p4', name: 'Laptop1' }] },
  { id: 'wl2', name: 'Books to Read', items: [{ id: 'p3', name: 'Fiction Novel' }] },
];

const wishlist = () => {
  const [userId, setUserId] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');
  const router = useRouter();

  const fetchWishlistDetails = async (id) => {
    //setIsLoading(true); // Assuming you have an isLoading state to manage UI loading feedback

    try {
      setDynamicText('Fetching Wishlists...');
      setProcessing(true);
      // Fetch the user's wishlist
      const wishlistResponse = await axios.get(`http://localhost:5000/api/users/${id}/wishlists`);
      const wishlists = wishlistResponse.data;

      // Map over each wishlist to fetch details for all products in each list
      const detailedWishlists = await Promise.all(wishlists.map(async (wishlist) => {
        const detailedItems = await Promise.all(wishlist.items.map(async (item) => {
          const productResponse = await axios.get(`http://localhost:5000/api/products/${item.product}`);
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

  // const fetchWishlistDetails = async (id) => {
  //   try {
  //     const wishlistResponse = await axios.get(`http://localhost:5000/api/users/${id}/wishlists`);
  //     const wishlistData = wishlistResponse.data;
  //     console.log(wishlistData);

  //     const productDetails = await Promise.all(wishlistData.map(async (wishlist) => {
  //       console.log(wishlist);
  //         await Promise.all(wishlist.items.map(async (item) => {
  //           console.log(item);
  //       const productResponse = await axios.get(`http://localhost:5000/api/products/${item.product}`);
  //       console.log(productResponse)
  //       return {
  //         ...item,
  //         productDetails: productResponse.data.product,
  //       };
  //     }))
  //     console.log(item);
  //   }));
  //     console.log(productDetails);
  //     setCartItems(productDetails);
  //   } catch (error) {
  //     console.error('Failed to fetch cart or product details', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const createWishlist = async () => {
    try {
      setDynamicText('Creating Wishlist...');
      setProcessing(true);
      const newName = prompt('Wishlist name:');
      if (newName) {

        let response = await axios.post('http://localhost:5000/api/users/wishlist', { userId, wishlistName: newName });
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
    <div className="mt-[60px] flex h-screen max-w-7xl mx-auto">
      {/* Wishlist Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
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
      {selectedWishlist === null ? (
        <p>Wishlist not found.</p>
      ) : (
        <>
          {/* Products List */}

          <div className="w-3/4 bg-white p-5">
            <h2 className="font-semibold text-2xl mb-4 pt-4">&gt; {selectedWishlist.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedWishlist.items.map(item => (
                <>
                  <ProductCard key={item._id} Product={item.productDetails} />
                  {/* <Link href={`/products/${product._id}`} className="transform overflow-hidden hover:shadow-lg bg-white duration-200 hover:scale-105 cursor-pointer">
                <img src="/images/cyclefront2.jpeg" alt="Product image" className="w-full px-5" />
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
              </Link> */}
                </>
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
  );
};

export default wishlist