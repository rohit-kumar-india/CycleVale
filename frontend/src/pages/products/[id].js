import React from 'react'
import { useRouter } from 'next/router';

// Placeholder data fetching function
async function fetchProduct(id) {
  // Replace with actual data fetching logic
  return { id, name: "Sample Bike", price: 999.99, description: "A great bike!" };
}

const getTopics = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      fetchProduct(id).then(setProduct);
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p>{product.description}</p>
      <p className="mt-4">Price: ${product.price}</p>
    </div>
  )
}

export default ProductDetail