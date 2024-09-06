import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar className="w-64 bg-gray-800 text-white" />
      <div className="flex-1 p-4 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;