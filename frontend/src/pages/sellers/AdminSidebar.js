import React from 'react';
import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-200 w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        <li>
          <Link legacyBehavior href="/sellers/AddProductForm" >
            <a className="block py-2">Add Product</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/sellers/ProductList" >
            <a className="block py-2">Manage Products</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/sellers/TotalSales" >
            <a className="block py-2">Total Sales</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/sellers/ProductList" >
            <a className="block py-2">Log Out</a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;

