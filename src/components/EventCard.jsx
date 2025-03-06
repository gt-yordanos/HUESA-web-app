
import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaUsers } from 'react-icons/fa'; // Import icons from react-icons

const EventCard = ({ event }) => {
  const { title, description, date, location, attendees } = event;

  return (
    <div className="card w-96 bg-base-100 shadow-xl text-base-content"> {/* Use bg-base-100 to automatically adapt to light/dark mode */}
      <div className="card-body p-6">
        {/* Event Title */}
        <h2 className="card-title text-2xl font-bold">{title}</h2>

        {/* Event Description */}
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{description}</p>

        {/* Event Date */}
        <div className="mt-4 flex items-center text-sm">
          <FaRegClock className="mr-2 text-yellow-500" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>

        {/* Event Location */}
        <div className="mt-2 flex items-center text-sm">
          <FaMapMarkerAlt className="mr-2 text-green-500" />
          <span>{location}</span>
        </div>

        {/* Event Attendees */}
        <div className="mt-2 flex items-center text-sm">
          <FaUsers className="mr-2 text-blue-500" />
          <span>{attendees.join(', ')}</span>
        </div>

        {/* Action Button (optional) */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;