import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import PatientList from "./PatientList/PatientList";
import AdminCreateUser from "./AdminCreateUser/AdminCreateUser";
import MyCalendar from "./Calendar/Calendar";
import PopulationGraph from "../Admin/Graph/PopulationGraph";
import { Grid, Box, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || userRole !== "admin")) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [user, userRole, loading, navigate, location]);

  const fetchPatients = async () => {
    const response = await fetch("/api/patients"); // Replace with actual API call
    const data = await response.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f7f9" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 3, overflowY: "auto" }}>
        <Header title="Admin Dashboard" />
        <Cards />
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={6}>
            <PopulationGraph />
          </Grid>
          <Grid item xs={12} md={6}>
            <AdminCreateUser />
          </Grid>
          <Grid item xs={12} md={6}>
            <PatientList patients={patients} />
          </Grid>
          <Grid item xs={12} md={6}>
            <MyCalendar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
