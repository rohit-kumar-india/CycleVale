import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className="border p-4">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>${product.price}</p>
      {/* Add to Cart Button or Link to Product Detail */}
    </div>
  )
}

export default ProductCard