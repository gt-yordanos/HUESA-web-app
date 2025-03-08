import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="transition-all duration-300">
        <AdminSidebar />
      </div>
      <div className="flex-1 p-8 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;