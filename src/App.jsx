import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.jsx";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/Registerpage.jsx"; 
import PrivateRoute from "./components/Auth/PrivateRoute";
import DoctorDashboard from "./Roles/doctor/DoctorDashboard";
import AdminDashboard from "./Roles/Admin/AdminDashboard";
import LabDashboard from "./Roles/Lab/LabDashboard";
import PatientDashboard from "./Roles/Patient/PatientDashboard";
import NurseDashboard from "./Roles/Nurse/NurseDashboard";
import NurseTasks from "./Roles/Nurse/NurseTasks";
import NurseAppointments from "./Roles/Nurse/NurseAppointment/NurseAppointments";
import CarePlans from "./Roles/Nurse/CarePlans";
import Calendar from "./Roles/Admin/Calendar/Calendar";
import Tables from "./Roles/Admin/Tables/Table";
import Cards from "./Roles/Admin/Cards/Cards";
import ReceptionistDashboard from "./Roles/Receptionist/ReceptionistDashboard";
import ReceptionistMessages from "./Roles/Receptionist/ReceptionistMessages";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> {/* Add Register Page */}

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/doctor/*" element={<DoctorDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/admin/calendar" element={<Calendar />} />
              <Route path="/admin/tables" element={<Tables />} />
              <Route path="/admin/cards" element={<Cards />} />
              <Route path="/patient/*" element={<PatientDashboard />} />
              <Route path="/lab" element={<LabDashboard />} />
              <Route path="/nurse" element={<NurseDashboard />} />
              <Route path="/nurse/appointments" element={<NurseAppointments />} />
              <Route path="/nurse/tasks" element={<NurseTasks />} />
              <Route path="/nurse/careplans" element={<CarePlans />} />
              <Route path="/receptionist" element={<ReceptionistDashboard />} />
              <Route path="/receptionist/messages" element={<ReceptionistMessages />} />
            </Route>
          </Routes>
        </Container>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
