import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const Events = () => {
  const fakeEvents = [
    {
      id: '1',
      title: 'Economics Conference 2025',
      description: 'An insightful conference on the latest trends in economics.',
      date: '2025-06-15T09:00:00Z',
      location: 'Haramaya University',
      attendees: ['Huesa Members', 'Economics Students'],
    },
    {
      id: '2',
      title: 'Accounting Workshop',
      description: 'Workshop on the basics of accounting and finance.',
      date: '2025-07-10T10:00:00Z',
      location: 'Haramaya University, Main Hall',
      attendees: ['Accounting Students', 'Huesa Members'],
    },
    {
      id: '3',
      title: 'Business Analytics Webinar',
      description: 'A webinar on the importance of data analytics in business.',
      date: '2025-08-05T11:00:00Z',
      location: 'Online',
      attendees: ['Management Students', 'Business Analytics Enthusiasts'],
    },
  ];

  const [events, setEvents] = useState(fakeEvents); // Using the fake events data
  const [loading, setLoading] = useState(false); // No need to load from DB anymore

  useEffect(() => {
    // Simulate loading state
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center">Loading events...</div>;
  }

  return (
    <div className="bg-base-300 py-20">
      <h1 className="sm:text-4xl text-2xl text-center py-8 font-bold mb-4">Upcoming Events</h1>
      
      {/* Center the grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-[10%] justify-items-center">
        {events.length === 0 ? (
          <div>No events found</div>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
};

export default Events;