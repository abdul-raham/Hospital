import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Context for authentication
import LoginPage from "./pages/Login/LoginPage"; // Login Page
import DoctorDashboard from "./Roles/doctor/DoctorDashboard"; // Doctor's Dashboard
import PrivateRoute from "./components/Auth/PrivateRoute"; // PrivateRoute for authentication protection
import "./index.css"; // Global styles

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Doctor Routes */}
          <Route
            path="/doctor"
            element={
              <PrivateRoute>
                <DoctorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <PrivateRoute>
                <div>Appointments Page</div>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/patients"
            element={
              <PrivateRoute>
                <div>Patients Page</div>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/settings"
            element={
              <PrivateRoute>
                <div>Settings Page</div>
              </PrivateRoute>
            }
          />

          {/* Default Route Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-All for 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
