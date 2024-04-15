import Link from 'next/link';

import { MenuIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/solid';

const ProfileLayout = ({ children }) => {

  return (
    <div className="mt-[60px] flex min-h-screen max-w-7xl mx-auto">
      {/* Left Menu */}
      <div className="w-1/4 bg-gray-200 p-4">
        <ul className="flex flex-col">
        <li className="mb-2 border-t-2 border-gray-400 flex flex-row">
          {/* <img src='/images/road.jpg' className='h-14 border border-gray-400'/> */}
          <UserIcon className="h-12 w-12  mr-1" />
          <div>
            <div className="text-blue-700 hover:text-blue-900 w-full text-left">Welcome,</div>
            <div className="font-bold text-xl hover:text-blue-900 w-full text-left">Rohit Kumar</div>
            </div>
          </li>
          {/* Account with submenu */}
          <li className="mb-2 border-t-2 border-gray-400">
            <div className="text-blue-700 hover:text-blue-900 w-full text-left">Account</div>
              <ul className="pl-4">
                <li><Link href="/profile/personal-info" legacyBehavior><a className="text-blue-600 hover:text-blue-800">Personal Info</a></Link></li>
                <li><Link href="/profile/addresses" legacyBehavior><a className="text-blue-600 hover:text-blue-800">Addresses</a></Link></li>
              </ul>
          </li>
          <li className="mb-2 border-t-2 border-gray-400">
            <div className="text-blue-700 hover:text-blue-900 w-full text-left">Payments</div>
              <ul className="pl-4">
                <li><Link href="/profile/wallets" legacyBehavior><a className="text-blue-600 hover:text-blue-800">Wallet/Gift Cards</a></Link></li>
                <li><Link href="/profile/saved-upi" legacyBehavior><a className="text-blue-600 hover:text-blue-800">Saved UPI</a></Link></li>
                <li><Link href="/profile/saved-cards" legacyBehavior><a className="text-blue-600 hover:text-blue-800">Saved Cards</a></Link></li>
              </ul>
          </li>
          <li className="mb-2">
            <Link href="/profile/account-settings" legacyBehavior><a className="text-blue-700 hover:text-blue-900">Account Settings</a></Link>
          </li>
          <li className="mb-2">
            <Link href="/profile/orders" legacyBehavior><a className="text-blue-700 hover:text-blue-900">Order History</a></Link>
          </li>
          <li className="mb-2">
            <Link href="/wishlist" legacyBehavior><a className="text-blue-700 hover:text-blue-900">Wishlist</a></Link>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;


// import React from 'react';
// import Link from 'next/link';

// const UserProfile = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-200 p-4">
//         <ul className="flex flex-col">
//           <li className="mb-2">
//             <Link href="/profile/personal-info" legacyBehavior><a className="text-blue-700 hover:text-blue-900">Personal Info</a></Link>
//           </li>
//           <li className="mb-2">
//             <Link href="/profile/account-settings" legacyBehavior><a className="text-blue-700 hover:text-blue-900">Account Settings</a></Link>
//           </li>
//           <li className="mb-2">
//             <Link href="/profile/orders" legacyBehavior><a className="text-blue-700 hover:text-blue-900">Order History</a></Link>
//           </li>
//           <li className="mb-2">
//             <Link href="/profile/wishlist" legacyBehavior><a className="text-blue-700 hover:text-blue-900">Wishlist</a></Link>
//           </li>
//         </ul>
//       </div>
      
//       {/* Main Content */}
//       <div className="w-3/4 p-4">
//         <h3>Please select a menu option</h3>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;