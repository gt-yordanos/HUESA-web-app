// LeadershipCard.js
import React from 'react';
import { FaLinkedin } from 'react-icons/fa'; // Import LinkedIn icon

const LeadershipCard = ({ image, name, role, linkedin }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-6 rounded-lg transition-transform transform hover:scale-105 duration-300">
      <div className="flex justify-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="rounded-full border-4 border-info w-32 h-32 object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-md text-gray-600 mb-4">{role}</p>
      <a 
        href={linkedin} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <FaLinkedin className="mr-2" /> LinkedIn
      </a>
    </div>
  );
};

export default LeadershipCard;
