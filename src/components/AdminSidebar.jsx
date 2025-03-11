import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUserFriends, FaRegBuilding, FaCalendarAlt, FaAward, FaCompressAlt, FaExpandAlt, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate(); 
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
  
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div
      className={`h-screen bg-base-300 transition-all duration-300 p-2 ${collapsed ? 'w-24' : 'w-52'}`}
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
            to="/admin/dashboard"
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
            to="/admin/manage-events"
            className={`flex items-center py-2 px-4 rounded text-lg ${getSelectedBg(isSelected('/admin/manage-events'))}`}
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
        <li>
          <button
            onClick={handleLogout}
            className={`flex items-center py-2 px-4 rounded text-lg ${getSelectedBg}`}
          >
            <FaSignOutAlt className={`${collapsed ? '' : 'mr-2'}`} />
            {!collapsed && 'Logout'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;