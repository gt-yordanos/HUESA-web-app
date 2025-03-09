import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';  // Ensure this is your Firebase auth configuration
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Create the context for authentication
const AuthContext = createContext();

// Provide authentication state to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This effect runs once when the app loads to listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user when authenticated
        user.getIdToken().then((idToken) => {
          localStorage.setItem('authToken', idToken); // Store the token in localStorage
        });
      } else {
        setUser(null); // Clear user if not logged in
        localStorage.removeItem('authToken'); // Clear token from localStorage when logged out
      }
    });

    return () => unsubscribe(); // Clean up the subscription when component is unmounted
  }, []);

  // Function to log out the user
  const logout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.removeItem('authToken'); // Remove token from localStorage
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Logout error:", error); // Handle any errors during logout
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};