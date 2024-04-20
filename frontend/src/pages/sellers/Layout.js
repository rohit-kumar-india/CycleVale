import React from 'react';
import AdminSidebar from './AdminSidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex pt-20">
      <AdminSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
