import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const ProductCard = ({product}) => {
  return (
    <>
  <Link href="/product/1" className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
    <img src="/cyclefront2.jpg" alt="Product image" className="w-full px-5" />
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
  </Link>
  <Link href="/product/1" className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
    <img src="/cyclefront3.jpg" alt="Product image" className="w-full px-5" />
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
  </Link>
  </>

    // <div className="border p-4">
    //   <h2 className="text-lg font-bold">{product.name}</h2>
    //   <p>${product.price}</p>
    //   {/* Add to Cart Button or Link to Product Detail */}
    // </div>
  )
}

export default ProductCard 