import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Products from '@/pages/products';


const ProductCard = ({product}) => {

  const currentDate = new Date();
  const isDiscountActive = product.discountPercentage > 0 && currentDate >= new Date(product.discountStart) && currentDate <= new Date(product.discountEnd);
  const discountedPrice = isDiscountActive ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) : product.price;
  return (
    <>
    {/* <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Image src={product.image} alt={product.name} width={400} height={400} objectFit="cover" className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">
          {product.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: ${product.price}</span>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
          <span className="ml-1 text-gray-600 text-sm">{product.rating} ({product.numReviews} Reviews)</span>
        </div>
      </div>
    </div> */}
  <Link href="/product/1" className="transform overflow-hidden hover:shadow-lg bg-white duration-200 hover:scale-105 cursor-pointer">
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
      {isDiscountActive ? (
        <>
        <p className="mr-2 text-lg font-semibold">₹{discountedPrice}</p>
        <p className="text-base  font-medium line-through"> ₹{product.price} </p>
        <p className="ml-2 text-base font-medium text-green-500"> {product.discountPercentage}% off</p>
        </>
      
      ) : (
        <p className="mr-2 text-lg font-semibold">₹{product.price}</p>
      )}
      </div>
    </div>
  </Link> 
  {/* <Link href="/product/1" className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
    <img src="/cyclefront3.jpg" alt="Product image" className="w-full px-5" />
    <div className="p-4 text-black/[0.9]">
      <h2>Product Name</h2>
      <div className="flex items-center text-black/[0.7]">
      <p className="mr-2 text-lg font-semibold">₹79.00</p>
      <p className="text-base  font-medium line-through"> ₹100.00 </p>
      <p className="ml-auto text-base font-medium text-green-500"> 21% off</p>
      </div>
    </div>
  </Link>

  <Link href="/product/1" className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
    <img src="/cyclefront4.jpg" alt="Product image" className="w-full px-5" />
    <div className="p-4 text-black/[0.9]">
      <h2>Product Name</h2>
      <div className="flex items-center text-black/[0.7]">
      <p className="mr-2 text-lg font-semibold">
                        $79.00
        </p>
      <p className="text-base  font-medium line-through"> $100.00 </p>
      <p className="ml-auto text-base font-medium text-green-500"> 21% off</p>
      </div>
    </div>
  </Link> */}
  </>

    // <div className="border p-4">
    //   <h2 className="text-lg font-bold">{product.name}</h2>
    //   <p>${product.price}</p>
    //   {/* Add to Cart Button or Link to Product Detail */}
    // </div>
  )
}

export default ProductCard 