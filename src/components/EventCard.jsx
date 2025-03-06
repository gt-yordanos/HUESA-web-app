import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaUsers, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const { title, description, date, location, attendees } = event;
  const eventDate = new Date(date);
  const isPastEvent = eventDate < new Date();

  return (
    <div className="card w-full bg-base-100 shadow-xl text-base-content flex flex-row items-center space-x-6 p-6 rounded-2xl relative">
      <div className="absolute top-4 right-2">
      {isPastEvent ? (
        <span className="badge badge-xs badge-error indicator-item"></span>
      ) : (
        <span className="badge badge-xs badge-success indicator-item"></span>
      )}
      </div>

      <div className="flex-1">
        <h2 className="card-title sm:text-2xl text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-gray-800 dark:text-gray-300">{description}</p>

        {/* Location and Date on single row */}
        <div className="mt-4 flex items-center text-sm space-x-4">
          <div className="flex items-center">
            <FaRegClock className="mr-2 text-yellow-500" />
            <span>{eventDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            <span>{location}</span>
          </div>
        </div>

        {/* Attendees */}
        <div className="mt-2 flex items-center text-sm">
          <FaUsers className="mr-2 text-blue-500" />
          <span>{attendees.join(', ')}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-info">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;