import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Create a Context
const AssociationsContext = createContext();

// Create a Provider
const AssociationsProvider = ({ children }) => {
  const [associations, setAssociations] = useState({
    contact: null,
    mission: null,
    vision: null,
  });

  const fetchAssociations = async () => {
    try {
      const contactDocRef = doc(db, 'associations', 'contact');
      const missionDocRef = doc(db, 'associations', 'mission');
      const visionDocRef = doc(db, 'associations', 'vision');

      const contactDoc = await getDoc(contactDocRef);
      const missionDoc = await getDoc(missionDocRef);
      const visionDoc = await getDoc(visionDocRef);

      if (contactDoc.exists() && missionDoc.exists() && visionDoc.exists()) {
        setAssociations({
          contact: contactDoc.data(),
          mission: missionDoc.data(),
          vision: visionDoc.data(),
        });
      }
    } catch (error) {
      console.error('Error fetching associations:', error);
    }
  };

  useEffect(() => {
    fetchAssociations();
  }, []);

  return (
    <AssociationsContext.Provider value={associations}>
      {children}
    </AssociationsContext.Provider>
  );
};

// Custom hook to use associations context
const useAssociations = () => {
  return React.useContext(AssociationsContext);
};

export { AssociationsProvider, useAssociations };