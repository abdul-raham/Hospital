import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Context for authentication
import LoginPage from './pages/Login/LoginPage'; // Login Page
import DoctorDashboard from './Roles/doctor/DoctorDashboard'; // Doctor's Dashboard
import NurseDashboard from './Roles/Nurse/NurseDashboard'; // Nurse's Dashboard
import PatientDashboard from './Roles/Patient/PatientDashboard'; // Patient's Dashboard
import AdminDashboard from './Roles/Admin/AdminDashboard'; // Admin's Dashboard
import LabDashboard from './Roles/Lab/LabDashboard'; // Lab's Dashboard
import PrivateRoute from './components/Auth/PrivateRoute'; // PrivateRoute for authentication protection
import './index.css'; // Global styles

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/DoctorDashboard" element={
            <PrivateRoute><DoctorDashboard /></PrivateRoute>
          } />
          <Route path="/NurseDashboard" element={
            <PrivateRoute><NurseDashboard /></PrivateRoute>
          } />
          <Route path="/PatientDashboard" element={
            <PrivateRoute><PatientDashboard /></PrivateRoute>
          } />
          <Route path="/AdminDashboard" element={
            <PrivateRoute><AdminDashboard /></PrivateRoute>
          } />
          <Route path="/LabDashboard" element={
            <PrivateRoute><LabDashboard /></PrivateRoute>
          } />

          {/* Fallback Route (for undefined paths) */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
