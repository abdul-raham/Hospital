import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const PrivateRoute = () => {
  const { user, userRole, loading } = useAuthContext();
  const location = useLocation();

  console.log("User:", user);
  console.log("UserRole:", userRole);

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
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!userRole || !rolePaths[userRole]) {
    console.error(`Invalid user role detected: ${userRole}`);
    return <Navigate to="/login" />;
  }

  // Handle redirection only if at root and user has a valid role
  if (location.pathname === "/" && rolePaths[userRole]) {
    console.log(`Redirecting user with role '${userRole}' to '${rolePaths[userRole]}'`);
    return <Navigate to={rolePaths[userRole]} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
