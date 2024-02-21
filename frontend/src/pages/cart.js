import React from 'react'

const cart = () => {
    // Placeholder cart items and total calculation
  const cartItems = []; // Populate with your cart items
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {/* Iterate over cart items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))
      )}
      <div className="mt-8">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  )
}

export default cart