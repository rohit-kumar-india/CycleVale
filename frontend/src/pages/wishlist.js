import React, { useState } from 'react';

// Mock data for demonstration
const initialWishlists = [
  { id: 'wl1', name: 'Tech Gadgets', products: [{ id: 'p1', name: 'Smartphone' }, { id: 'p2', name: 'Laptop' }] },
  { id: 'wl2', name: 'Books to Read', products: [{ id: 'p3', name: 'Fiction Novel' }] },
];

const wishlist = () => {
  const [wishlists, setWishlists] = useState(initialWishlists);
  const [selectedWishlist, setSelectedWishlist] = useState(initialWishlists[0]);

  const createWishlist = () => {
    const newName = prompt('Wishlist name:');
    if (newName) {
      const newWishlist = { id: `wl${wishlists.length + 1}`, name: newName, products: [] };
      setWishlists([...wishlists, newWishlist]);
    }
  };

  const removeProduct = (productId) => {
    const updatedWishlist = { ...selectedWishlist, products: selectedWishlist.products.filter(product => product.id !== productId) };
    setSelectedWishlist(updatedWishlist);

    const updatedWishlists = wishlists.map(wl => wl.id === selectedWishlist.id ? updatedWishlist : wl);
    setWishlists(updatedWishlists);
  };

  const addToCart = (productId) => {
    console.log(`Adding product ${productId} to cart`);
    // Implement adding to cart logic here
  };

  return (
    <div className="mt-[60px] flex h-screen max-w-7xl mx-auto">
      {/* Wishlist Sidebar */}
      <div className="w-1/4 bg-gray-100 p-5">
        <h2 className="font-semibold text-xl mb-4">My Wishlists</h2>
        <ul>
          {wishlists.map(wishlist => (
            <li key={wishlist.id} 
                className={`p-2 ${selectedWishlist.id === wishlist.id ? 'bg-blue-500 text-white' : ''}`} 
                onClick={() => setSelectedWishlist(wishlist)}>
              {wishlist.name}
            </li>
          ))}
        </ul>
        <button className="mt-4 p-2 bg-green-500 text-white rounded" onClick={createWishlist}>Create New Wishlist</button>
      </div>

      {/* Products List */}
      <div className="w-3/4 bg-white p-5">
        <h2 className="font-semibold text-xl mb-4">{selectedWishlist.name}</h2>
        <div className="grid grid-cols-3 gap-4">
          {selectedWishlist.products.map(product => (
            <div key={product.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{product.name}</h3>
              <div className="flex justify-between mt-3">
                <button className="bg-red-500 text-white p-2 rounded" onClick={() => removeProduct(product.id)}>Remove</button>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => addToCart(product.id)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default wishlist