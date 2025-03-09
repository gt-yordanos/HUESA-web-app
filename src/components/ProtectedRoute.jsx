import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage

    if (token) {
      // Use Firebase's token verification and claims
      const verifyAdminClaims = async () => {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token
          if (decodedToken && decodedToken.admin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          setIsAdmin(false);
        }
      };
      
      verifyAdminClaims();
    } else {
      setIsAdmin(false);
    }

    setLoading(false); // Finished processing
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking the token
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
