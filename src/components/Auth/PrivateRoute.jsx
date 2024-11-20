import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';  // Use the context hook for authentication

const PrivateRoute = () => {
  const { user, loading } = useAuthContext();  // Use `user` and `loading` from context

  // If loading, display a loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, allow access to the route
  return <Outlet />;
};

export default PrivateRoute;
