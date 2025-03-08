import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserFriends, FaRegBuilding, FaCalendarAlt, FaAward, FaCompressAlt, FaExpandAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  const handleSidebarCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getSelectedBg = (isSelected) => {
    if (isSelected) {
      return theme === 'light' ? 'bg-black text-white' : 'bg-white text-black';
    }
    return '';
  };


  const isSelected = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="flex">
      <div
        className={`h-screen bg-base-300 p-2 transition-all duration-300 ${collapsed ? 'w-24' : 'w-60'}`}
        style={{ transition: 'width 0.3s ease' }}
      >
        <div className="mb-4 text-xl font-semibold text-center">
          HUESA
        </div>
        <div className="mb-4 flex justify-between items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleSidebarCollapse}
            className="text-xl p-2 rounded bg-base-200 hover:bg-base-100 cursor-pointer"
          >
            {collapsed ? <FaExpandAlt /> : <FaCompressAlt />}
          </button>
        </div>
        <ul className="menu p-0 text-base-content flex flex-col gap-2 m-auto">
          <li>
            <Link
              to="/admin"
              className={`flex items-center py-2 px-4 rounded text-lg ${getSelectedBg(isSelected('/admin/dashboard'))}`}
            >
              <FaTachometerAlt className={`${collapsed ? '' : 'mr-2'}`} />
              {!collapsed && 'Dashboard'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/association"
              className={`flex items-center py-2 px-4 rounded text-lg ${getSelectedBg(isSelected('/admin/association'))}`}
            >
              <FaRegBuilding className={`${collapsed ? '' : 'mr-2'}`} />
              {!collapsed && 'Association'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/members"
              className={`flex items-center py-2 px-4 rounded text-lg ${getSelectedBg(isSelected('/admin/members'))}`}
            >
              <FaUserFriends className={`${collapsed ? '' : 'mr-2'}`} />
              {!collapsed && 'Members'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/post-events"
              className={`flex items-center py-2 px-4 rounded text-lg ${getSelectedBg(isSelected('/admin/post-events'))}`}
            >
              <FaCalendarAlt className={`${collapsed ? '' : 'mr-2'}`} />
              {!collapsed && 'Events'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/certificates"
              className={`flex items-center py-2 px-4 rounded text-lg ${getSelectedBg(isSelected('/admin/certificates'))}`}
            >
              <FaAward className={`${collapsed ? '' : 'mr-2'}`} />
              {!collapsed && 'Certificates'}
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8"></div>
    </div>
  );
};

export default AdminSidebar;