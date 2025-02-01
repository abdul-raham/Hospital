import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 🔹 Ensure correct import path

const PrivateRoute = ({ allowedRoles }) => {
  const { user, role, loading } = useAuth();

  console.log("User:", user); // Debugging user
  console.log("User Role:", role); // Debugging role
  console.log("Allowed Roles:", allowedRoles); // Debugging allowed roles

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking role
  }

  if (!user || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
 