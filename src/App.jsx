import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/LoginPage"; // Assuming this is the login page component
import DoctorDashboard from "./Roles/doctor/DoctorDashboard";
import NurseDashboard from "./Roles/Nurse/NurseDashboard";
import PatientDashboard from "./Roles/Patient/PatientDashboard";
import { AuthProvider } from "./context/AuthContext"; // AuthContext to wrap the entire app

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          {/* Doctor Role */}
          <Route path="/doctor" element={<DoctorDashboard />} />

          {/* Nurse Role */}
          <Route path="/nurse" element={<NurseDashboard />} />

          {/* Patient Role */}
          <Route path="/patient" element={<PatientDashboard />} />

          {/* Catch-all for 404 */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "20%" }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
