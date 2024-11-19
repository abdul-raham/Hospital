// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDashboard from './roles/doctor/DoctorDashboard';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Login/LoginPage';
import './index.css';  // Import global styles

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<div>Appointments</div>} />
          <Route path="/doctor/patients" element={<div>Patients</div>} />
          <Route path="/doctor/settings" element={<div>Settings</div>} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
