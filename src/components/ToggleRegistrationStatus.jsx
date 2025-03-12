import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TIMEOUT_LIMIT = 5000;

const ToggleRegistrationStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the current 'isOpen' status from Firestore with a timeout
  useEffect(() => {
    const fetchStatus = async () => {
      const timeoutId = setTimeout(() => {
        toast.error('Network error: Request timed out');
        setLoading(false);
      }, TIMEOUT_LIMIT);

      try {
        const statusDocRef = doc(db, 'registration', 'status');
        const docSnap = await getDoc(statusDocRef);

        if (docSnap.exists()) {
          setIsOpen(docSnap.data().isOpen);
        } else {
          console.error('No such document!');
          toast.error('Error: Document not found');
        }
      } catch (error) {
        console.error('Error fetching status:', error);
        toast.error(`Error fetching status: ${error.message}`);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchStatus();
  }, []); // Run effect once on mount to fetch the status

  const toggleStatus = async () => {
    const timeoutId = setTimeout(() => {
      toast.error('Network error: Request timed out');
    }, TIMEOUT_LIMIT); // Set timeout for 5 seconds

    try {
      const statusDocRef = doc(db, 'registration', 'status');
      await updateDoc(statusDocRef, {
        isOpen: !isOpen,
      });
      setIsOpen(!isOpen);

      if (!isOpen) {
        toast.success('Registration Opened Successfully');
      } else {
        toast.success('Registration Closed Successfully');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(`Error updating registration status: ${error.message}`);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center">
      <label htmlFor="toggle-status" className="mr-2 text-lg">
        Toggle Registration Status:
      </label>
      <input
        type="checkbox"
        id="toggle-status"
        checked={isOpen}
        onChange={toggleStatus}
        className="toggle toggle-success"
      />
    </div>
  );
};

export default ToggleRegistrationStatus;