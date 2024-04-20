import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Dummy data for products (replace with actual data fetching logic)
  useEffect(() => {
    // Example: Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Replace with your API endpoint
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
    // Implement edit logic (e.g., navigate to edit page)
  };

  const handleDelete = (productId) => {
    console.log(`Delete product with ID: ${productId}`);
    // Implement delete logic (e.g., show confirmation modal, make API request)
  };

  return (
    <Layout>
    <div className="container mx-auto px-4 ">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/images/cyclefront2.jpeg" alt={product.name} className="h-20 w-20 object-contain" />
              <div>
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-gray-600">${product.price}</p>
                {product.discount && (
                  <p className="text-red-500">Discounted Price: ${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEdit(product.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default ProductList;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductCard from '@/Components/ProductCard';
// import AdminSidebar from './AdminSidebar';
// import Layout from './Layout';


// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products');
//           setProducts(response.data.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

 

//   return (
//     <Layout >
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <h2 className="text-lg font-bold mb-4">Manage Products</h2>
//           <ul>
//             {products.map((product) => (
//               <li key={product.id} Product={product} className="border-b py-2" >
//                 <ProductCard key={product._id} Product={product} />
//                 {/* Display other product details */}
//                 <button type="submit"
//         className="bg-blue-500  mr-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
//                 <button type="submit"
//         className="bg-red-500  mr-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Layout>
//       );
// };


// export default ProductList;

//  // return (
//   //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//   //     {products.map((product) => (
//   //       <ProductCard key={product._id} Product={product} />
//   //     ))}
//   //   </div>
//   // );

// // import React from 'react';

// // const ProductList = ({ products }) => {
// //   return (
// //     <div>
// //       <h2 className="text-lg font-bold mb-4">Manage Products</h2>
// //       <ul>
// //         {products.map((product) => (
// //           <li key={product.id} className="border-b py-2">
// //             <p>{product.name}</p>
// //             {/* Display other product details */}
// //             <button>Edit</button>
// //             <button>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

