import React from 'react';
import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-200 w-64 h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 py-4 border-b-2 border-gray-400">Admin Dashboard</h2>
      <ul>
        <li>
          <Link legacyBehavior href="/sellers/AddProductForm" >
            <a className="block p-2 hover:bg-gray-300">Add Product</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/sellers/ProductList" >
            <a className="block p-2 hover:bg-gray-300">Manage Products</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/sellers/TotalSales" >
            <a className="block p-2 hover:bg-gray-300">Total Sales</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/sellers/ProductList" >
            <a className="block p-2 font-semibold text-red-500 hover:bg-gray-300">Log Out</a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;

