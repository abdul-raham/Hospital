import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; // Access authentication context

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext(); // Retrieve the user object from context

  // If no user is authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the children components
  return children;
};

export default PrivateRoute;
