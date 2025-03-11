import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaUsers } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const { title, description, date, location, attendees } = event;
  const eventDate = new Date(date);
  const isPastEvent = eventDate < new Date();

  // Format the date in the format "Month Day, Year" (e.g., September 6, 2025)
  const eventDateString = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Format the time with AM/PM
  const eventTimeString = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="card w-full bg-base-100 shadow-xl text-base-content flex flex-row items-center space-x-6 p-6 pt-9 rounded-2xl relative">
      <div className="absolute top-4 right-2">
        {isPastEvent ? (
          <span className="badge badge-xs badge-error indicator-item"></span>
        ) : (
          <span className="badge badge-xs badge-success indicator-item"></span>
        )}
      </div>

      <div className="flex-1">
        <h2 className="card-title text-xl sm:text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-300">{description}</p>

        {/* Location and Date on a single row */}
        <div className="mt-4 flex items-center text-sm sm:text-base md:text-lg space-x-4">
          <div className="flex items-center">
            <FaRegClock className="mr-2 text-yellow-500" />
            <span>{`${eventDateString} at ${eventTimeString}`}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            <span>{location}</span>
          </div>
        </div>

        {/* Attendees */}
        <div className="mt-2 text-sm sm:text-base md:text-lg">
          <div className="flex items-center mb-2">
            <FaUsers className="mr-2 text-blue-500" />
            <span className="font-semibold">Attendees:</span>
          </div>

          {/* Display each attendee in a separate element with some styling */}
          <div className="flex flex-wrap space-x-2">
            {attendees.length > 0 ? (
              attendees.map((attendee, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 mb-2 rounded-full text-sm sm:text-base"
                >
                  {attendee}
                </span>
              ))
            ) : (
              <span>No attendees</span>
            )}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-info">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;