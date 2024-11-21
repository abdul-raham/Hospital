import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Login/LoginPage"; // Adjust path if necessary
import PrivateRoute from "./components/Auth/PrivateRoute.jsx"; // PrivateRoute component to protect routes
import DoctorDashboard from "./Roles/doctor/DoctorDashboard.jsx"; // You can adjust paths for other role dashboards if necessary
import AdminDashboard from "./Roles/Admin/AdminDashboard.jsx";
import LabDashboard from "./Roles/Lab/LabDashboard.jsx";
import PatientDashboard from "./Roles/Patient/PatientDashboard.jsx";
import NurseDashboard from "./Roles/Nurse/NurseDashboard.jsx";
import NurseAppointments from "./Roles/Nurse/NurseAppointments.jsx";
import CarePlans from "./Roles/Nurse/CarePlans.jsx";
import Calendar from "./Roles/Admin/Calendar/Calendar.jsx";
import Tables from "./Roles/Admin/Tables/Table.jsx";
import Cards from "./Roles/Admin/Cards/Cards.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LoginPage />} />{" "}
            {/* Set Login as the home page */}
            {/* Private routes (only accessible after login) */}
            <Route element={<PrivateRoute />}>
              {" "}
              {/* Wrap the private routes here */}
              <Route path="/Doctor" element={<DoctorDashboard />} />
              <Route path="/Admin" element={<AdminDashboard />} />
              <Route path="/Patient" element={<PatientDashboard />} />
              <Route path="/Lab" element={<LabDashboard />} />
              <Route path="/Nurse" element={<NurseDashboard />} />
            </Route>
            {/* Specific routes for Nurse */}
            <Route path="/nurse/appointments" element={<NurseAppointments />} />
            <Route path="/nurse/careplans" element={<CarePlans />} />

            {/* Specific routes for Admin */}
            <Route path="/admin/calendar" element={<Calendar />} />
            <Route path="/admin/tables" element={<Tables />} />
            <Route path="/admin/cards" element={<Cards />} />
          </Routes>
        </Container>
        <ToastContainer />{" "}
        {/* Add ToastContainer here to show toast messages */}
      </Router>
    </AuthProvider>
  );
};

export default App;
