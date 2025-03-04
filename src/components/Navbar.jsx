import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaBook, FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-[10%]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/" className="flex items-center"><FaHome /> Home</Link></li>
            <li><Link to="/about" className="flex items-center"><FaInfoCircle /> About</Link></li>
            <li><Link to="/events" className="flex items-center"><FaRegCalendarAlt /> Events</Link></li>
            <li><Link to="/library" className="flex items-center"><FaBook /> Library</Link></li>
            <li><Link to="/register" className="flex items-center"><FaUserPlus /> Register</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">HUESA</Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div>
          <ThemeToggle/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
