import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Login/LoginPage";
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
import ReceptionistAppointments from "./Roles/Receptionist/Receptionist";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Private routes */}
            <Route element={<PrivateRoute />}>
            <Route>
              <Route path="/doctor/*" element={<DoctorDashboard />} /></Route>  
              <Route path="/Admin/*" element={<AdminDashboard />} />
              <Route path="/Patient/*" element={<PatientDashboard />} />
              <Route path="/Lab" element={<LabDashboard />} />
              <Route path="/Nurse" element={<NurseDashboard />} />
              <Route path="/Receptionist" element={<ReceptionistAppointments />} /> 
            </Route>

            {/* Specific routes for Nurse */}
            <Route path="/nurse/appointments" element={<NurseAppointments />} />
            <Route path="/nurse/tasks" element ={<NurseTasks />} />
            <Route path="/nurse/careplans" element={<CarePlans />} />

            {/* Specific routes for Admin */}
            <Route path="/admin/calendar" element={<Calendar />} />
            <Route path="/admin/tables" element={<Tables />} />
            <Route path="/admin/cards" element={<Cards />} />
          </Routes>
        </Container>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
