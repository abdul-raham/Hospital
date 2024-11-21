import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import PatientList from "./PatientList/PatientList";
import AdminCreateUser from "./AdminCreateUser/AdminCreateUser";
import MyCalendar from "./Calendar/Calendar";
import { Grid, Box } from "@mui/material";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    // Replace with actual API call to fetch patient data
    const response = await fetch("/api/patients"); // Example API endpoint
    const data = await response.json();
    setPatients(data);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar for navigation */}
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Header title="Admin Dashboard" />
        {/* Dashboard Cards */}
        <Cards />

        {/* Main Content Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Patient List */}
            <PatientList patients={patients} />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* User Creation Form */}
            <AdminCreateUser />
          </Grid>
          <Grid item xs={12}>
            {/* Calendar Component */}
            <MyCalendar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
