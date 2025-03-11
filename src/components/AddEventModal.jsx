import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEventModal = ({ event, setEvent, handleCreateEvent, handleUpdateEvent, isLoading, setShowModal, isEditMode }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [manualAttendee, setManualAttendee] = useState('');

  const TITLE_MAX_LENGTH = 100;
  const DESCRIPTION_MAX_LENGTH = 500;

  useEffect(() => {
    if (isEditMode && event) {
      // Set initial values for editing
      setEvent({ ...event });
    }
  }, [isEditMode, event, setEvent]);

  const validateForm = () => {
    const errors = {};
    if (!event.title) errors.title = 'Title is required';
    else if (event.title.length > TITLE_MAX_LENGTH) errors.title = `Title must be under ${TITLE_MAX_LENGTH} characters`;

    if (!event.description) errors.description = 'Description is required';
    else if (event.description.length > DESCRIPTION_MAX_LENGTH) errors.description = `Description must be under ${DESCRIPTION_MAX_LENGTH} characters`;

    if (!event.date) errors.date = 'Event date is required';
    else if (new Date(event.date) < new Date()) errors.date = 'Event date cannot be in the past';

    if (!event.location) errors.location = 'Location is required';

    if (event.attendees.length === 0) errors.attendees = 'At least one attendee group must be selected';

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAttendeeChange = (e) => {
    const { value, checked } = e.target;
    let updatedAttendees = [...event.attendees];

    // If "Any one" is selected, unselect all other groups
    if (value === 'Any one' && checked) {
      updatedAttendees = ['Any one'];
    }
    // If "Huesa Members" is selected, unselect all other specific groups
    else if (value === 'Huesa Members' && checked) {
      updatedAttendees = ['Huesa Members'];
      const huesaExclusions = ['Economics Students', 'PADM Students', 'Accounting Students', 'Management Students', 'Cooperative Students'];
      updatedAttendees = updatedAttendees.filter(attendee => !huesaExclusions.includes(attendee));
    }
    // If another attendee group is selected, unselect "Any one" or "Huesa Members"
    else if (checked) {
      updatedAttendees.push(value);
      // Remove "Any one" and "Huesa Members" if they are selected already
      updatedAttendees = updatedAttendees.filter(attendee => attendee !== 'Any one' && attendee !== 'Huesa Members');
    }
    // If unchecked, remove the value from the attendees list
    else {
      updatedAttendees = updatedAttendees.filter(attendee => attendee !== value);
    }

    setEvent(prevState => ({ ...prevState, attendees: updatedAttendees }));
  };

  const handleAddManualAttendee = () => {
    if (manualAttendee && !event.attendees.includes(manualAttendee)) {
      setEvent(prevState => ({ ...prevState, attendees: [...prevState.attendees, manualAttendee] }));
      setManualAttendee('');
    } else {
      toast.error('Please enter a valid attendee or avoid duplicates.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditMode) {
        await handleUpdateEvent();
      } else {
        await handleCreateEvent();
      }
      setShowModal(false);
    } else {
      toast.error('Please fix the errors and try again.');
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Event' : 'Create New Event'}</h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Event Title"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          className="input input-bordered mb-2 w-full"
        />
        {errorMessages.title && <p className="text-error text-sm">{errorMessages.title}</p>}

        {/* Description */}
        <textarea
          placeholder="Event Description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          className="textarea textarea-bordered mb-2 w-full"
        />
        {errorMessages.description && <p className="text-error text-sm">{errorMessages.description}</p>}

        {/* Date */}
        <input
          type="datetime-local"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          className="input input-bordered mb-2 w-full"
        />
        {errorMessages.date && <p className="text-error text-sm">{errorMessages.date}</p>}

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={event.location}
          onChange={(e) => setEvent({ ...event, location: e.target.value })}
          className="input input-bordered mb-2 w-full"
        />
        {errorMessages.location && <p className="text-error text-sm">{errorMessages.location}</p>}

        {/* Attendees (Checkboxes in a Box) */}
        <div className="mb-2 border-1 border-gray-500 p-4 rounded">
          <label className="block text-sm font-semibold mb-2">Select Attendees</label>
          <div className="flex flex-wrap gap-4">
            {['Huesa Members', 'Economics Students', 'Accounting Students', 'Management Students', 'PADM Students', 'Cooperative Students', 'Any one'].map(option => (
              <label key={option} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  value={option}
                  checked={event.attendees.includes(option)}
                  onChange={handleAttendeeChange}
                  className="checkbox checkbox-info"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        {errorMessages.attendees && <p className="text-error text-sm">{errorMessages.attendees}</p>}

        {/* Manually add an attendee */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Add Custom Attendee</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualAttendee}
              onChange={(e) => setManualAttendee(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter attendee name"
            />
            <button type="button" onClick={handleAddManualAttendee} className="btn btn-outline">Add</button>
          </div>
        </div>

        {/* Display selected attendees as tags */}
        <div className="flex flex-wrap mb-4">
          {event.attendees.map((attendee, index) => (
            <div key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
              <span>{attendee}</span>
              <FaTimes onClick={() => setEvent(prevState => ({ ...prevState, attendees: prevState.attendees.filter(a => a !== attendee) }))} className="ml-2 cursor-pointer" />
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="modal-action">
          <button onClick={handleSubmit} className="btn btn-info text-white">
            {isLoading ? <span className="loading loading-spinner loading-xl"></span> : isEditMode ? 'Update Event' : 'Post Event'}
          </button>
          <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;