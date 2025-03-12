import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useAssociations } from '../contexts/AssociationsContext'; // Import the context

const Footer = () => {
  const { contact } = useAssociations(); // Access contact data from the context

  // Check if the contact data has been fetched
  if (!contact) {
    return <div className="w-full h-full py-28 flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>; // Display loading state if contact data is not yet available
  }

  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      {/* Navigation Links */}
      <nav className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        <Link to="/" className="link link-hover">Home</Link>
        <HashLink smooth to="/#about" className="link link-hover">About</HashLink>
        <HashLink smooth to="#teams" className="link link-hover">Our Teams</HashLink>
        <Link to="/events" className="link link-hover">Events</Link>
        <Link to="/library" className="link link-hover">Library</Link>
        <Link to="/register" className="link link-hover">Register</Link>
      </nav>

      {/* Social Media Links */}
      <nav>
        <div className="grid grid-flow-col gap-4">
          {/* Display social links dynamically */}
          {contact.facebook && (
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
              {/* Facebook Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform duration-200">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
              </svg>
            </a>
          )}

          {contact.instagram && (
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
              {/* Instagram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform duration-200">
                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
              </svg>
            </a>
          )}

          {contact.facebook && (
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
              {/* Facebook Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform duration-200">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
              </svg>
            </a>
          )}

          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform duration-200">
                <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"></path>
              </svg>
            </a>
          )}

          {contact.telegram && (
            <a href={contact.telegram} target="_blank" rel="noopener noreferrer">
              {/* Telegram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" className="fill-current hover:scale-110 transition-transform duration-200">
                <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"></path>
              </svg>
            </a>
          )}
        </div>
      </nav>

      {/* Copyright Section */}
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by HUESA</p>
      </aside>
    </footer>
  );
};

export default Footer;