import React from 'react'
// Placeholder data fetching function
async function fetchProducts() {
  // Replace with actual data fetching logic
  return [
    { id: 1, name: "Road Bike", price: 999.99 },
    { id: 2, name: "Mountain Bike", price: 1099.99 },
  ];
}


const Products = () => {
    const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} className="mb-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products