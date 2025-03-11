import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import EventCard from '../components/EventCard';
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsQuery = query(collection(db, 'events'));
        const querySnapshot = await getDocs(eventsQuery);
        const fetchedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort events by date in descending order (most recent first)
        const sortedEvents = fetchedEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Separate upcoming and past events
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const pastEvents = events.filter(event => new Date(event.date) <= new Date());

  return (
    <div className="bg-base-300 py-20 min-w-[100vh]">
      {/* Upcoming Events Section */}
      <h1 className="sm:text-4xl text-2xl text-center py-8 font-bold mb-4">Upcoming Events</h1>

      <div className="space-y-6 px-4 lg:px-[10%]">
        {loading ? (
          // Skeleton loader for events
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex w-full flex-col gap-4">
              <div className="skeleton h-32 w-full bg-base-100 shadow-xl rounded-2xl"></div>
              <div className="skeleton h-4 w-1/2 bg-base-100"></div>
              <div className="skeleton h-4 w-full bg-base-100"></div>
              <div className="skeleton h-4 w-full bg-base-100"></div>
            </div>
          ))
        ) : upcomingEvents.length === 0 ? (
          <div>No upcoming events found</div>
        ) : (
          upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>

      {/* Past Events Section */}
      <h1 className="sm:text-4xl text-2xl text-center py-8 font-bold mb-4 mt-12">Past Events</h1>

      <div className="space-y-6 px-4 lg:px-[10%]">
        {loading ? (
          // Skeleton loader for events
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex w-full flex-col gap-4">
              <div className="skeleton h-32 w-full bg-base-100 shadow-xl rounded-2xl"></div>
              <div className="skeleton h-4 w-1/2 bg-base-100"></div>
              <div className="skeleton h-4 w-full bg-base-100"></div>
              <div className="skeleton h-4 w-full bg-base-100"></div>
            </div>
          ))
        ) : pastEvents.length === 0 ? (
          <div>No past events found</div>
        ) : (
          pastEvents.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
};

export default Events;