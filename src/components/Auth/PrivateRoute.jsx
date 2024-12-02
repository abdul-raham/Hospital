import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx"; // Named import

const PrivateRoute = () => {
  const { user, loading, userRole } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loader or spinner
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

  // Redirect user to their role-based dashboard
  if (location.pathname === "/") {
    const redirectPath = rolePaths[userRole];
    return redirectPath ? <Navigate to={redirectPath} /> : <Navigate to="/" />;
  }

  // Handle invalid role
  if (!rolePaths[userRole]) {
    return <Navigate to="/" />; // Redirect to login or default page
  }

  return <Outlet />;
};

export default PrivateRoute;
