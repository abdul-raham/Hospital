import React from "react";
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import TopBar from "../../components/Common/Navbar/Toolbar.jsx";
import Sidebar from "../../Roles/Nurse/NurseSidebar/NurseSidebar.jsx";
import NurseAppointments from "../Nurse/NurseAppointment/NurseAppointments.jsx"; // Import NurseAppointments
import Patients from "../Patient/PatientDashboard.jsx";
import NurseTasks from "./NurseTasks.jsx"; // Import NurseTasks
import CarePlans from "./CarePlans.jsx";
import Header from "../Nurse/Header/Header.jsx"
import "./NurseDashboard.css";

const NurseDashboard = () => {
  const location = useLocation();

  const getTitle = (path) => {
    switch (path) {
      case "/nurse/appointments":
        return "Appointments";
      case "/nurse/patients":
        return "Patients";
      case "/nurse/tasks":
        return "Tasks";
      case "/nurse/careplans":
        return "Care Plans";
      default:
        return "Nurse Dashboard";
    }
  };

  const title = getTitle(location.pathname);

  return (
    <Box className="nurse-dashboard">
      {/* Sidebar */}
      <Sidebar className="sidebar" />

      {/* Main Content */}
      <Box className="main-content">
        {/* TopBar */}
        <TopBar title={title} className="top-bar" />

        {/* Dashboard Overview Tiles */}
        <Grid container spacing={3} className="dashboard-tiles" sx={{ marginTop: "5%" }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/appointments">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Appointments
                  </Typography>
                  <Typography variant="h6" color="primary">
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
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/patients">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Patients
                  </Typography>
                  <Typography variant="h6" color="primary">
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
            <Card className="tile">
              <CardActionArea component={Link} to="/nurse/tasks">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Tasks
                  </Typography>
                  <Typography variant="h6" color="primary">
                    Manage Tasks
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View, manage, and update your assigned tasks efficiently.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Typography variant="h5">Welcome to your dashboard!</Typography>} />
          <Route path="appointments" element={<NurseAppointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="tasks" element={<NurseTasks />} />
          <Route path="careplans" element={<CarePlans />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default NurseDashboard;
