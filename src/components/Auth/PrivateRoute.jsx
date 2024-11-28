import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading, userRole } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Add a loader if needed
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  // Redirect to role-specific dashboards if accessing a base route
  const rolePaths = {
    doctor: "/doctor",
    nurse: "/nurse",
    admin: "/admin",
    lab: "/lab",
    patient: "/patient",
    receptionist: "/receptionist",
  };
  const redirectPath = rolePaths[userRole];

  return redirectPath ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
