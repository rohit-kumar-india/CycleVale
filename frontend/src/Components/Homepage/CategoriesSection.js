import Link from 'next/link';
import React from 'react';

const CategoriesSection = () => {
  // Define your categories data
  const categories = [
    { name: 'Hybrid Bikes', image: './images/urban.jpg' },
    { name: 'Mountain Bikes', image: '/images/mountain.jpg' },
    { name: 'Road Bikes', image: '/images/road.jpg' },
    // Add more categories as needed
  ];

  return (
    <section className="py-8 bg-gray-100">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative">
              <Link href="/" legacyBehavior>
                <a className="block bg-white text-black shadow-md rounded-md overflow-hidden group">
                  <img src={category.image} alt={category.name} className="w-full h-100 object-cover transition duration-300 transform group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
