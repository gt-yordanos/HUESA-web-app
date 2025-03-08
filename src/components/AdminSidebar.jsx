import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserFriends, FaRegBuilding, FaCalendarAlt, FaAward, FaCompressAlt, FaExpandAlt } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('/admin/dashboard');

  const handleSidebarCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = (path) => {
    setSelected(path);
  };

  return (
    <div className="flex">
      <div className={`w-${collapsed ? '16' : '64'} h-screen bg-base-300 p-4 transition-all duration-300`}>
        <div className="mb-4 text-xl font-semibold text-center">
          HUESA
        </div>
        <div className="mb-4 flex justify-between items-center">
          <ThemeToggle />
          <button
            onClick={handleSidebarCollapse}
            className="text-xl p-2 rounded bg-base-100 hover:bg-primary hover:text-white"
          >
            {collapsed ? <FaExpandAlt /> : <FaCompressAlt />}
          </button>
        </div>
        <ul className="menu p-4 text-base-content text-center">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center py-2 rounded text-xl ${selected === '/admin/dashboard' ? 'bg-base-100 text-white' : 'hover:bg-base-200'}`}
              onClick={() => handleLinkClick('/admin/dashboard')}
            >
              <FaTachometerAlt className="mr-2" /> {!collapsed && 'Dashboard'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/association"
              className={`flex items-center py-2 rounded text-xl ${selected === '/admin/association' ? 'bg-base-100 text-white' : 'hover:bg-base-200'}`}
              onClick={() => handleLinkClick('/admin/association')}
            >
              <FaRegBuilding className="mr-2" /> {!collapsed && 'Association'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/members"
              className={`flex items-center py-2 rounded text-xl ${selected === '/admin/members' ? 'bg-base-100 text-white' : 'hover:bg-base-200'}`}
              onClick={() => handleLinkClick('/admin/members')}
            >
              <FaUserFriends className="mr-2" /> {!collapsed && 'Members'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/events"
              className={`flex items-center py-2 rounded text-xl ${selected === '/admin/events' ? 'bg-base-100 text-white' : 'hover:bg-base-200'}`}
              onClick={() => handleLinkClick('/admin/events')}
            >
              <FaCalendarAlt className="mr-2" /> {!collapsed && 'Events'}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/certificates"
              className={`flex items-center py-2 rounded text-xl ${selected === '/admin/certificates' ? 'bg-base-100 text-white' : 'hover:bg-base-200'}`}
              onClick={() => handleLinkClick('/admin/certificates')}
            >
              <FaAward className="mr-2" /> {!collapsed && 'Certificates'}
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8"></div>
    </div>
  );
};

export default AdminSidebar;
