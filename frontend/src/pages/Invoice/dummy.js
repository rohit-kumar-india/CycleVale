import React from 'react';
import InvoicePage from './InvoicePage';

const dummy = () => {
  // Example customer information
  const customerInfo = {
    name: 'John Doe',
    address: '123 Main St, City, State, Zip',
    email: 'johndoe@example.com',
    phone: '123-456-7890'
  };

  // Example product details
  const products = [
    { name: 'Product A', brand: 'Brand X', price: 50, count: 2 },
    { name: 'Product B', brand: 'Brand Y', price: 30, count: 1 },
    { name: 'Product C', brand: 'Brand Z', price: 25, count: 3 }
  ];

  return <InvoicePage customerInfo={customerInfo} products={products} />;
};

export default dummy;
