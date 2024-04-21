import React from 'react';
import AdminSidebar from './AdminSidebar';

const Layout = ({ children }) => {
  return (
    <div className="mt-[60px] flex max-w-7xl mx-auto">
      <AdminSidebar />
      <main className="flex-1 p-4 mx-10">{children}</main>
    </div>
  );
};

export default Layout;
