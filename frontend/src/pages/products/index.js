import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProductCard from '@/Components/ProductCard';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';

const Products = () => {
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isNoMore, setIsNoMore] = useState(false);

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

  const fetchWishlistDetails = async (id) => {
    try {
      setDynamicText('Fetching Wishlist Details...');
      setProcessing(true);
      // Fetch the user's wishlist
      const wishlistResponse = await axiosInstance.get(`/api/users/${id}/wishlists`);
      const wishlists = wishlistResponse.data;

      let newWishlistItems = [...wishlistItems]; // Start with a copy of the current wishlistItems

      for (let wishlist of wishlists) {
        wishlist.items.forEach(item => {
          newWishlistItems.push(item.product);
        });
      }

      setWishlistItems(newWishlistItems); // Update the state once after processing all items

    } catch (error) {
      console.error('Failed to fetch wishlist or product details', error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    fetchWishlistDetails(userId);
    // fetchProducts().then(setProducts);
    //setUserId(userId);
  }, []);

  const [filters, setFilters] = useState({
    ratings: {
      '5 Star': false,
      '4 Star': false,
      '3 Star': false,
      '2 Star': false,
      '1 Star': false,
      '0 Star': false
    },
    brands: {
      AVON: false,
      Herculas: false,
      FIREFOX: false,
      HERO: false,
      "Urban Terrain": false
    },
    ageGroup: {
      younger: false,
      adult: false,
      older: false
    },
    type: {
      hybrid: false,
      mountain: false,
      road: false
    },
    idealFor: {
      boys: false,
      girls: false,
      mens: false
    },
    speed: {
      none: false,
      '1 Gear': false,
      '3 Gears': false,
      '7 Gears': false,
      '21 Gears': false,
      '27 Gears': false
    },
    gearType: {
      nonGear: false,
      gear: false
    },
    brake: {
      disc: false,
      wire: false
    },
    availability: {
      inStock: false,
      outOfStock: false
    }
  });

  // Function for fetching all product
  const fetchProducts = async (page, filters) => {
    try {
      console.log(filters)
      setDynamicText('Fetching Products...');
      setProcessing(true);
      const response = await axiosInstance.get(`/api/products`, {
        params: {
          limit: 12,
          page: page,
          filters: JSON.stringify(filters)
        },
      });
      const data = response.data;
      if (data.length < 10 || data.length === 0) {
        setIsNoMore(true);
      }else{
        setIsNoMore(false);
      }
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProcessing(false);
    }
  }

  const handleCheckboxChange = (category, value) => {
    // If category is an object (e.g., duration), handle its nested state
    if (typeof filters[category] === 'object') {
      setFilters({
        ...filters,
        [category]: { ...filters[category], [value]: !filters[category][value] },
      });
    } else {
      // If category is a boolean, toggle its state
      setFilters({ ...filters, [category]: !filters[category] });
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, filters);

  }, [currentPage, filters]);

  return (
    <>
      <div className="mt-[60px] w-full flex justify-center ">
        <div className="flex flex-row gap-6 max-w-7xl border-1 p-6">

          {/* Left side Filters Section */}
          <div className='flex flex-col justify-left gap-2 shadow-lg md:px-5 w-1/3 md:w-1/6 h-fit'>

            <div className='font-bold text-xl text-center p-4 border-b-2'>Filters</div>
            <div className='my-2 pl-2 hover:shadow-lg'>
              <h2 className='font-bold text-l mb-2'>Ratings</h2>
              {Object.keys(filters.ratings).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.ratings[key]}
                    onChange={() => handleCheckboxChange('ratings', key)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{key}</span>
                </label>
              ))}
            </div>

            <div className='my-2 pl-2 hover:shadow-lg'>
              <h2 className='font-bold text-l mb-2'>Brands</h2>
              {Object.keys(filters.brands).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.brands[key]}
                    onChange={() => handleCheckboxChange('brands', key)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{key}</span>
                </label>
              ))}
            </div>

            <div className='mb-6 pl-2 hover:shadow-lg'>
              <h2 className='font-bold text-l mb-2'>Age Group</h2>
              {Object.keys(filters.ageGroup).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.ageGroup[key]}
                    onChange={() => handleCheckboxChange('ageGroup', key)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{key}</span>
                </label>
              ))}
            </div>

            <div className='mb-6 pl-2 hover:shadow-lg'>
              <h2 className='font-bold text-l mb-2'>Type</h2>
              {Object.keys(filters.type).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.type[key]}
                    onChange={() => handleCheckboxChange('type', key)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{key}</span>
                </label>
              ))}
            </div>

            <div className='mb-6 pl-2 hover:shadow-lg'>
              <h2 className='font-bold text-l mb-2'>Ideal For</h2>
              {Object.keys(filters.idealFor).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.idealFor[key]}
                    onChange={() => handleCheckboxChange('idealFor', key)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{key}</span>
                </label>
              ))}
            </div>

            <div className='mb-6 pl-2 hover:shadow-lg'>
              <h2 className='font-bold text-l mb-2'>Speed</h2>
              {Object.keys(filters.speed).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.speed[key]}
                    onChange={() => handleCheckboxChange('speed', key)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{key}</span>
                </label>
              ))}
            </div>

          </div>

          {/* Right side Products Section */}
          <div className='w-2/3 md:w-5/6'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                // Check if the current product ID is in the wishlistItems array
                const isWishlisted = wishlistItems.includes(product._id);

                return (
                  // Passed the wishlisted status as a prop to the ProductCard
                  <ProductCard key={product._id} Product={{ ...product, wishlisted: isWishlisted }} />
                );
              })}
            </div>

            {/* navigation buttons */}
            <div className='my-10 flex justify-center gap-6'>
              <button
                onClick={() => prevPage()}
                disabled={currentPage === 1}
                className={`flex justify-center items-center gap-2 bg-orange-300 hover:bg-orange-500 rounded-full px-3 text-gray-800 hover:text-white transition-all duration-700 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              > <ArrowLeftIcon className="w-6 " />
                prev
              </button>
              <span className='rounded-full border-2 border-deep-purple flex justify-center items-center w-7 h-7'>{currentPage}</span>
              <button
                disabled={isNoMore === true}
                onClick={() => nextPage()}
                className={`flex justify-center items-center gap-2 bg-orange-300 hover:bg-orange-500 rounded-full px-3 text-gray-800 hover:text-white transition-all duration-700 ${isNoMore === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >next
                <ArrowRightIcon className="w-6 " />
              </button>
            </div>
          </div>
          {/* Processing popup */}
          {processing && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
              <div className="text-white text-lg ml-4">{dynamicText}</div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Products