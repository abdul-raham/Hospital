import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import PatientList from "./PatientList/PatientList";
import AdminCreateUser from "./AdminCreateUser/AdminCreateUser";
import MyCalendar from "./Calendar/Calendar";
import PopulationGraph from "../Admin/Graph/PopulationGraph"; // Import Graph Component
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
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f7f9" }}>
      {/* Sidebar for navigation */}
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 3, overflowY: "auto" }}>
        <Header title="Admin Dashboard" />
        {/* Dashboard Cards */}
        <Cards />

        {/* Main Content Section */}
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {/* Graph Section */}
          <Grid item xs={12} md={6}>
            <PopulationGraph />
          </Grid>

          {/* User Creation Form */}
          <Grid item xs={12} md={6}>
            <AdminCreateUser />
          </Grid>

          {/* Patient List */}
          <Grid item xs={12} md={6}>
            <PatientList patients={patients} />
          </Grid>

          {/* Calendar Component */}
          <Grid item xs={12} md={6}>
            <MyCalendar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
