import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading, userRole } = useAuthContext();
  const location = useLocation();

  console.log("PrivateRoute - User:", user);
  console.log("PrivateRoute - UserRole:", userRole);

  // Role-based paths
  const rolePaths = {
    doctor: "/doctor",
    nurse: "/nurse",
    admin: "/admin",
    lab: "/lab",
    patient: "/patient",
    receptionist: "/receptionist",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.warn("User not logged in. Redirecting to login.");
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (!userRole || !rolePaths[userRole]) {
    console.error(`Invalid user role detected: ${userRole}`);
    return <Navigate to="/" />;
  }

  if (location.pathname === "/" && rolePaths[userRole]) {
    console.log(`Redirecting user with role '${userRole}' to '${rolePaths[userRole]}'`);
    return <Navigate to={rolePaths[userRole]} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
