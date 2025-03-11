import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AddEventModal from '../components/AddEventModal';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', attendees: [] });
  const [searchTitle, setSearchTitle] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null); // State for editing an event

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const eventsQuery = query(collection(db, 'events'));
      const querySnapshot = await getDocs(eventsQuery);
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      toast.error('Failed to load events.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
      toast.error('All fields are required!');
      return;
    }
  
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'events'), newEvent); // Create new event
      toast.success('Event created successfully!');
      setNewEvent({ title: '', description: '', date: '', location: '', attendees: [] });
      fetchEvents();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to create event.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateEvent = async () => {
    if (!editingEvent) return;
    if (!editingEvent.title || !editingEvent.description || !editingEvent.date || !editingEvent.location) {
      toast.error('All fields are required!');
      return;
    }
  
    setIsLoading(true);
    try {
      const eventRef = doc(db, 'events', editingEvent.id);
      await updateDoc(eventRef, editingEvent);
      toast.success('Event updated successfully!');
      fetchEvents();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to update event.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    setDeletingEventId(eventId); 
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, 'events', eventId));
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event.');
    } finally {
      setIsLoading(false);
      setDeletingEventId(null); 
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event); // Set the event being edited
    setShowModal(true); // Open the modal
  };

  const filterEvents = (events) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      if (isNaN(eventDate.getTime())) return false; 

      const eventDateString = eventDate.toLocaleDateString();
  
      if (filterDate) {
        const selectedDate = new Date(`${filterMonth}/${filterDate}/${filterYear}`);
        if (isNaN(selectedDate.getTime())) return false; 
        const selectedDateString = selectedDate.toLocaleDateString();
        if (eventDateString !== selectedDateString) return false;
      }

      if (filterMonth && eventDate.getMonth() !== parseInt(filterMonth) - 1) return false;
      if (filterYear && eventDate.getFullYear() !== parseInt(filterYear)) return false;
  
      return true;
    });
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateDaysForMonth = (monthIndex, year) => {
    const date = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };  

  return (
    <div className="container mx-auto">
      <div className="sticky top-2 z-10 lg:p-4 bg-base-100">
        <h1 className="text-3xl font-bold mb-4">Manage Events</h1>

        <div className="mb-6">
          <button
            onClick={() => { 
              setEditingEvent(null); // Reset any event that's being edited
              setShowModal(true); 
            }} 
            className="btn btn-success flex text-black items-center space-x-2"
          >
            <FaPlus />
            <span>Post Event</span>
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="input input-bordered w-full"
          />
          
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Filter by Year</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Filter by Month</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>

          {filterMonth && filterYear && (
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="select select-bordered"
            >
              <option value="">Filter by Date</option>
              {generateDaysForMonth(parseInt(filterMonth) - 1, filterYear).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {showModal && (
        <AddEventModal
          event={editingEvent || newEvent}
          setEvent={editingEvent ? setEditingEvent : setNewEvent}
          handleCreateEvent={handleCreateEvent}
          handleUpdateEvent={handleUpdateEvent}
          isLoading={isLoading}
          setShowModal={setShowModal}
          isEditMode={editingEvent !== null}
        />
      )}

      <div className='mt-2'>
        <h2 className="text-xl mb-2">Event List</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Attendees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterEvents(events).map((event) => (
                <tr key={event.id}>
                  <td className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                    {event.attendees.length > 0 ? event.attendees.join(', ') : 'No attendees'}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditEvent(event)} // Open modal for editing
                      className="btn btn-sm btn-info text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="btn btn-sm btn-error ml-2 text-white"
                      disabled={deletingEventId === event.id}
                    >
                      {deletingEventId === event.id ? (
                        <span className="loading loading-spinner loading-sm text-error"></span>
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;