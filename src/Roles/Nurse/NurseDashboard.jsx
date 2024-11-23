import React from "react";
import TopBar from "../../components/Common/Navbar/Toolbar.jsx";
import Sidebar from "../../Roles/Nurse/NurseSidebar/NurseSidebar.jsx";
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Appointments from "../doctor/DoctorAppointments.jsx";
import Patients from "../Patient/PatientDashboard.jsx";
import CarePlans from "./CarePlans.jsx";
import "./NurseDashboard.css";

const NurseDashboard = () => {
  const location = useLocation();

  const getTitle = (path) => {
    switch (path) {
      case "/nurse/appointments":
        return "Appointments";
      case "/nurse/patients":
        return "Patients";
      case "/nurse/settings":
        return "Settings";
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
        <Grid container spacing={3} className="dashboard-tiles"  sx={{ marginTop: "5%" }}>
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
              <CardActionArea component={Link} to="/nurse/settings">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Settings
                  </Typography>
                  <Typography variant="h6" color="primary">
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

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Typography variant="h5">Welcome to your dashboard!</Typography>} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="careplans" element={<CarePlans />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default NurseDashboard;
