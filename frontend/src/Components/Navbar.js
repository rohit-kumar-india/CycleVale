import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to home page or show logout feedback
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-yellow-300 to-orange-500">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="mr-2">
            <MenuIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        {/* Logo */}
        <div>
        <Link href="/" legacyBehavior>
            <a className="flex items-center">
              <img src="/images/logo.png" alt="BikeShop Logo" width={250} height={250} />
              {/* <span className="font-bold text-gray-700 ml-2">BikeShop</span> */}
            </a>
          </Link>
        </div>

        {/* Primary Nav */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/" legacyBehavior><a className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a></Link>
          <Link href="/products" legacyBehavior><a className="py-5 px-3 text-gray-700 hover:text-gray-900">Cycles</a></Link>
          <Link href="/about" legacyBehavior><a className="py-5 px-3 text-gray-700 hover:text-gray-900">About</a></Link>
          <Link href="/contact" legacyBehavior><a className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a></Link>
          <Link href="/wishlist" legacyBehavior><a className="py-5 px-3 text-gray-700 hover:text-gray-900">Wishlist</a></Link>
          <Link href="/cart" legacyBehavior><a className="py-5 px-3 text-gray-700 hover:text-gray-900 flex items-center"><ShoppingCartIcon className="h-5 w-5 mr-1"/> Cart</a></Link>
        </div>

        {/* Secondary Nav - Always visible */}
        <div className="flex items-center space-x-1">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="py-2 px-3 bg-yellow-400 text-gray-700 hover:bg-yellow-500 hover:text-white flex items-center rounded">
              <UserIcon className="h-5 w-5 mr-1"/> Logout
            </button>
          ) : (
            <Link href="/Login" legacyBehavior><a className="py-2 px-3 bg-yellow-400 text-gray-700 hover:bg-yellow-500 hover:text-white flex items-center rounded"><UserIcon className="h-5 w-5 mr-1"/> Login</a></Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <Link href="/" legacyBehavior><a className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500">Home</a></Link>
        <Link href="/products" legacyBehavior><a className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500">Cycles</a></Link>
        <Link href="/about" legacyBehavior><a className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500">About</a></Link>
        <Link href="/contact" legacyBehavior><a className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500">Contact</a></Link>
        <Link href="/cart" legacyBehavior><a className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 flex items-center"><ShoppingCartIcon className="h-5 w-5 mr-1"/> Cart</a></Link>
      </div>
    </nav>
  );
};

export default Navbar;





// import React from 'react'
// import Link from 'next/link';
// import styles from '@/styles/Header.module.css';

// const Header = () => {
//     return (
//         <>
//         <nav className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" legacyBehavior>
//           <a className="text-lg font-bold">CycleVale</a>
//         </Link>
//         <div>
//         <Link href="/about" legacyBehavior>
//             <a className="px-4">About</a>
//           </Link>
//           <Link href="/contact" legacyBehavior>
//             <a className="px-4">Contact</a>
//             </Link>
//           <Link href="/products" legacyBehavior>
//             <a className="px-4">Products</a>
//           </Link>
//           <Link href="/cart" legacyBehavior>
//             <a className="px-4">Cart</a>
//           </Link>
//           <Link href="/Login" legacyBehavior>
//             <a className="px-4">Login</a>
//           </Link>
//         </div>
//       </div>
//     </nav>
//         </>
//     );
// };


// export default Header