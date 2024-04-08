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
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Product details and specifications.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Price
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {isDiscountActive ? (
                  <>
                    <span className="line-through">₹{product.price}</span>{" "}
                    <span className="text-green-600">₹{discountedPrice}</span>
                  </>
                ) : (
                  `₹${product.price}`
                )}
              </dd>
            </div>
            {/* Include other product details like brand, category, etc., similar to the layout above */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Description
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {product.description}
              </dd>
            </div>
            {/* Consider adding an image section */}
            <div className="bg-white px-4 py-5 sm:px-6">
              {/* <img src={product.image || '/images/cyclefront2.jpeg'} alt={product.name} width={500} height={500} objectFit="contain" /> */}
              <img src={'/images/cyclefront2.jpeg'} alt={product.name} width={500} height={500} objectFit="contain" />
            </div>
          </dl>
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