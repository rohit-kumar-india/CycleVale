import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProductCard from '@/Components/ProductCard';
import { toast } from 'react-toastify';

const Products = () => {
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [processing, setProcessing] = useState(false); // State to manage processing status
  const [dynamicText, setDynamicText] = useState('');

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

  // Function for fetching all product
  const fetchProducts = async () => {
    try {
      setDynamicText('Fetching Products...');
      setProcessing(true);
      const response = await axios.get('http://localhost:5000/api/products');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProcessing(false);
    }
  }

  const fetchWishlistDetails = async (id) => {
    //setIsLoading(true); // Assuming you have an isLoading state to manage UI loading feedback

    try {
      setDynamicText('Fetching Wishlist Details...');
      setProcessing(true);
      // Fetch the user's wishlist
      const wishlistResponse = await axios.get(`http://localhost:5000/api/users/${id}/wishlists`);
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
    fetchProducts().then(setProducts);
    //setUserId(userId);
  }, []);

  const [filters, setFilters] = useState({
    ratings: {
      '5 Star': false,
      '4 Star': false,
      '3 Star': false,
      '2 Star': false,
      '2 Star': false
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

  const currentDate = new Date();
  // const isDiscountActive = product.discountPercentage > 0 && currentDate >= new Date(product.discountStart) && currentDate <= new Date(product.discountEnd);
  // const discountedPrice = isDiscountActive ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) : product.price;
  return (
    <>
      <div className="mt-[60px] w-full flex justify-center">
        <div className="flex gap-10 flex-col max-w-7xl">

          <div className="flex flex-row gap-6 border-1 p-6">

            <div className='flex flex-col justify-left gap-2 w-full shadow-lg px-6 w-[35%]'>
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
            {/* Processing popup */}
            {processing && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                <div className="text-white text-lg ml-4">{dynamicText}</div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Products