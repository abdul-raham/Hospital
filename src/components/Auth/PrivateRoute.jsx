import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext"; // Use your authentication context

const PrivateRoute = () => {
  const { user, loading } = useAuthContext(); // Use `user` and `loading` from context

  // If loading, display a spinner or loading message
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader component
  }

  // If no user is authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated, allow access to child routes
  return <Outlet />;
};

export default PrivateRoute;
