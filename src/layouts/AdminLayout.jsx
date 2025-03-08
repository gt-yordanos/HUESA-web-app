import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-[100vh] w-[100vw] overflow-hidden">
      <div className="transition-all duration-300">
        <AdminSidebar />
      </div>
      <div className="flex-1 lg:p-8 py-6 transition-all duration-300 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;