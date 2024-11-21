import React from "react"; // Make sure React is imported only once
import Sidebar from "../../Roles/doctor/Sidebar/Sidebar.jsx";
import TopBar from "../../components/Common/Navbar/Toolbar.jsx";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Appointments from "../doctor/DoctorAppointments.jsx";
import Patients from "../Patient/PatientDashboard.jsx";

import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const location = useLocation(); // Get the current route using useLocation

  const getTitle = (path) => {
    switch (path) {
      case "/doctor/appointments":
        return "Appointments";
      case "/doctor/patients":
        return "Patients";
      case "/doctor/settings":
        return "Settings";
      default:
        return "Doctor Dashboard"; // Default title for the dashboard
    }
  };

  const title = getTitle(location.pathname); // Get the title based on the current route

  return (
    <Box sx={{ display: "flex" }} className="doctor-dashboard">
      {/* Sidebar */}
      <Sidebar className="sidebar" />

      {/* Main Dashboard Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }} className="main-content">
        {/* TopBar */}
        <TopBar title={title} className="top-bar" />

        {/* Dashboard Overview Tiles */}
        <Grid
          container
          spacing={3}
          sx={{ marginBottom: "30px" }}
          className="dashboard-tiles"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }} className="tile">
              <CardActionArea component={Link} to="/doctor/appointments">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                  >
                    Appointments
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    35 Upcoming
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View and manage your scheduled appointments.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }} className="tile">
              <CardActionArea component={Link} to="/doctor/patients">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                  >
                    Patients
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    120 Active Patients
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Access detailed patient records and history.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }} className="tile">
              <CardActionArea component={Link} to="/doctor/settings">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                  >
                    Settings
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Manage Preferences
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Update your profile and other settings.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Routes for dynamic content rendering */}
        <Routes>
          <Route
            path="/"
            element={
              <Typography variant="h5">Welcome to your dashboard!</Typography>
            }
          />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
