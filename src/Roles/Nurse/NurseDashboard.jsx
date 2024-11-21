import React from 'react';
<<<<<<< HEAD
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Common/Sidebar/Sidebar.jsx';
import TopBar from '../../components/Common/Navbar/Toolbar.jsx';
import './NurseDashboard.css';
=======
import Sidebar from '../../components/Common/Sidebar/Sidebar.jsx';
import TopBar from '../../components/Common/Navbar/Toolbar.jsx'; 
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; 

// Components for each section
import Appointments from '../doctor/DoctorAppointments.jsx';
import Patients from '../Patient/PatientDashboard.jsx';

// Importing CSS
import './NurseDashboard.css'; // This will hold the copied styles from DoctorDashboard
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619

const NurseDashboard = () => {
  const location = useLocation(); // Get the current route using useLocation
  
  // Helper function to return the correct title based on the path
  const getTitle = (path) => {
    switch (path) {
      case '/nurse/appointments':
        return 'Appointments';
      case '/nurse/patients':
        return 'Patients';
      case '/nurse/settings':
        return 'Settings';
      default:
        return 'Nurse Dashboard'; // Default title for the dashboard
    }
  };

  const title = getTitle(location.pathname); // Get the title based on the current route

  return (
    <Box sx={{ display: 'flex' }} className="nurse-dashboard">
      {/* Sidebar */}
      <Sidebar className="sidebar" />

<<<<<<< HEAD
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }} className="main-content">
        {/* TopBar */}
        <TopBar className="top-bar" />

        <Typography
          variant="h3"
          component="h1"
          sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}
        >
          Nurse Dashboard
        </Typography>

        {/* Dashboard Tiles */}
=======
      {/* Main Dashboard Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }} className="main-content">
        {/* TopBar - It will automatically update the title based on the page */}
        <TopBar title={title} className="top-bar" />

        {/* Dashboard Overview Tiles */}
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619
        <Grid container spacing={3} sx={{ marginBottom: '30px' }} className="dashboard-tiles">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }} className="tile">
              <CardActionArea component={Link} to="/nurse/appointments">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                    Appointments
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
<<<<<<< HEAD
                    25 Upcoming
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View and manage assigned appointments.
=======
                    35 Upcoming
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View and manage your scheduled appointments.
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }} className="tile">
              <CardActionArea component={Link} to="/nurse/patients">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                    Patients
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
<<<<<<< HEAD
                    80 Active Patients
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Access patient records and assist in patient care.
=======
                    120 Active Patients
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Access detailed patient records and history.
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }} className="tile">
              <CardActionArea component={Link} to="/nurse/settings">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                    Settings
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    Manage Preferences
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
<<<<<<< HEAD
                    Update your profile and settings.
=======
                    Update your profile and other settings.
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
<<<<<<< HEAD
=======

        {/* Routes for dynamic content rendering */}
        <Routes>
          <Route path="/" element={<Typography variant="h5">Welcome to your dashboard!</Typography>} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
        </Routes>
>>>>>>> 02ad1770a5923cdd6e0de5698854fb8ba5f22619
      </Box>
    </Box>
  );
};

export default NurseDashboard;
