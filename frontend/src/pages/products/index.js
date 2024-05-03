import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProductCard from '@/Components/ProductCard';
import { toast } from 'react-toastify';

// Placeholder data fetching function
async function fetchProducts() {
  // Replace with actual data fetching logic
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

const Products = () => {
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true); // Assuming you have an isLoading state to manage UI loading feedback

    try {
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
      setIsLoading(false); // Update loading state
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

  if (isLoading) {
    return <div className='mt-[60px] height-[600px]'>Loading Products...</div>;
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
                {//wishlistItems.includes(product.id)
                  //product.id ? 'a':'b'
                  //isWishlisted({product.name})
                }

                // Check if the current product ID is in the wishlistItems array
                const isWishlisted = wishlistItems.includes(product._id);

                // Pass the wishlisted status as a prop to the ProductCard
                return (
                  <>
                    <ProductCard key={product._id} Product={{ ...product, wishlisted: isWishlisted }} />
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
                );
              })}
            </div>

          </div>



        </div>
      </div>
    </>
  )
}

export default Products