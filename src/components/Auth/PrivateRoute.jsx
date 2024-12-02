import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx"; // Named import

const PrivateRoute = () => {
  const { user, loading, userRole } = useAuthContext();
  const location = useLocation(); // Capture the current location for possible redirects

  if (loading) {
    return <div>Loading...</div>; // Replace with a loader if desired
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  const rolePaths = {
    doctor: "/doctor",
    nurse: "/nurse",
    admin: "/admin",
    lab: "/lab",
    patient: "/patient",
    receptionist: "/receptionist",
  };

  // If accessing a base route, redirect to a role-specific dashboard
  if (location.pathname === "/") {
    const redirectPath = rolePaths[userRole];
    return redirectPath ? <Navigate to={redirectPath} /> : <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
