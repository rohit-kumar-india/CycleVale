import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Reviews from './Reviews'
import axios from 'axios';
import Head from 'next/head';
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import ReviewList from './ReviewList';

// Placeholder for fetching a single product's details
async function fetchProduct(id) {
  try {
    const response = await axios.get(`http://localhost:5000/api/products/${id}`);
    return response.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}



const ProductDetails = () => {
  const [userId,setUserId] =useState('');
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(product? product.imageURLs[0]: null);
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL

  
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

  async function addToCart(userId, productId, quantity) {
    const response = await fetch('http://localhost:5000/api/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
  
    const data = await response.json();
    toast.success("added in cart successfully", toastOptions)
  }
  // Example usage
  // addToCart('507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012', 1)
  //   .then(() => console.log('Item added to cart'))
  //   .catch(error => console.error('Error:', error));
  

  // const handleClick = () => {
  //   router.push('/')
  // }

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (id) {
      fetchProduct(id).then((res)=> {
        console.log(res)
        setProduct(res)});
    }
    setUserId(userId)
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Or any other loading state
  }

  const currentDate = new Date();
  const isDiscountActive = product.discountPercentage > 0 && currentDate >= new Date(product.discountStart) && currentDate <= new Date(product.discountEnd);
  const discountedPrice = isDiscountActive ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) : product.price;

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className="mt-[60px] w-full flex justify-center flex-row bg-white shadow  mx-auto">
        
        <div className='max-w-7xl flex' >
          {/* Left Section for Images */}
            <div className=" flex flex-col bg-white px-4 py-5 sm:px-6 w-[50%] sticky top-[60px] relative" style={{ maxHeight: '600px', overflow: 'auto' }}>
              {/* <img src={product.image || '/images/cyclefront2.jpeg'} alt={product.name} width={500} height={500} objectFit="contain" /> */}
              <img
                src={selectedImage ? selectedImage : product.imageURLs[0]}
                alt={product.name}
                className="w-[500px] h-[500px] object-contain overflow-hidden inset-0"
              />
              <div className="flex flex-row gap-2 w-full mt-5">
                {product.imageURLs.map((image, index) => (
                  <img
                    key={index}
                    src={image ? image : '/images/cyclefront2.jpeg'}
                    alt={product.name}
                    width={80}
                    objectFit="contain"
                    onClick={() => setSelectedImage(image)}
                    className="cursor-pointer"
                  />
                ))}
              </div>
              <div className="flex flex-row gap-2 justify-center w-full h-15 mt-5">
                <div
                  onClick={() => router.push('/')}
                  className="w-full py-2 px-3 bg-yellow-400 transition-all duration-500 hover:cursor-pointer text-gray-700 hover:bg-yellow-500 hover:text-white flex justify-center items-center rounded"
                >
                  <ShoppingBagIcon className="h-10 mr-1" /> Buy Now
                </div>
                <div
                  onClick={() => addToCart(userId, product._id, 1)}
                  className="w-full py-2 px-3 bg-yellow-400 transition-all duration-500 hover:cursor-pointer text-gray-700 hover:bg-yellow-500 hover:text-white flex justify-center items-center rounded"
                >
                  <ShoppingCartIcon className="h-10 mr-1" /> Add to Cart
                </div>
            </div>
        </div>

        {/* Right Section for product details */}
        <div className="px-4 sm:px-6 border-t border-gray-200 flex-grow">
          
        <div className="py-5">
          <h3 className="font-bold text-xl leading-6 text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Product details and specifications.
          </p>
        </div>
        <div className="flex items-center mb-1">
          <span className="text-m">{product.rating}</span>
          <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
          <span className="ml-2 text-sm"> ({product.numReviews} Reviews)</span>
        </div>
        <div className=''>
         <div className='font-semibold text-green-600'>Special Price</div>
         {isDiscountActive ? (
                  <>
                  
                    <span className="font-bold text-xl text-green-600">₹{discountedPrice}</span>
                    <span className="ml-2 line-through">₹{product.price}</span>{" "}
                    <span className="font-bold ml-2 text-xl text-green-600">{product.discountPercentage}% off</span>
                  </>
                ) : (
                  <span className="font-bold text-xl">₹{product.price}</span>
                )}
        </div>
        <div className="w-full bg-white px-4 py-5">
              <dt className="text-sm font-medium text-gray-500">
                Description
              </dt>

              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {/* {product.description} */}
              </dd>

            </div>
            <ReviewList reviews={product.reviews}/>
          <Reviews/>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;


// import React from 'react'
// import { useRouter } from 'next/router';

// // Placeholder data fetching function
// async function fetchProduct(id) {
//   // Replace with actual data fetching logic
//   return { id, name: "Sample Bike", price: 999.99, description: "A great bike!" };
// }

// const getTopics = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/topics", {
//         cache: "no-store",
//       });
  
//       if (!res.ok) {
//         throw new Error("Failed to fetch topics");
//       }
  
//       return res.json();
//     } catch (error) {
//       console.log("Error loading topics: ", error);
//     }
//   };

// const ProductDetail = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [product, setProduct] = React.useState(null);

//   React.useEffect(() => {
//     if (id) {
//       fetchProduct(id).then(setProduct);
//     }
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//       <p>{product.description}</p>
//       <p className="mt-4">Price: ${product.price}</p>
//     </div>
//   )
// }

// export default ProductDetail