import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-[100vh] w-[100vw] overflow-hidden">
      <div className="transition-all duration-300 bg-green-600">
        <AdminSidebar />
      </div>
      <div className="w-full lg:py-8 px-4 py-6 transition-all duration-300 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;