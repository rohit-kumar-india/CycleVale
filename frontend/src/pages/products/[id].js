import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';

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
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL

  useEffect(() => {
    if (id) {
      fetchProduct(id).then(setProduct);
    }
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
      <div className="w-full flex flex-row bg-white shadow max-w-7xl mx-auto">
        {/* Left Section for Images */}
      <div className=" flex flex-col bg-white px-4 py-5 sm:px-6 w-[50%]">
              {/* <img src={product.image || '/images/cyclefront2.jpeg'} alt={product.name} width={500} height={500} objectFit="contain" /> */}
              <img src={'/images/cyclefront2.jpeg'} alt={product.name} width={800} height={800} objectFit="contain" />
              <div className='flex flex-row w-full mt-5'>
              <img src={'/images/cyclefront2.jpeg'} alt={product.name} width={80} objectFit="contain" />
              <img src={'/images/cyclefront2.jpeg'} alt={product.name} width={80}  objectFit="contain" />
              </div>
      </div>

        {/* Right Section for product details */}
        <div className="px-4 sm:px-6 border-t border-gray-200">
          
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
                  <span className="font-bold text-xl">₹${product.price}</span>
                )}
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