import React from 'react';
import Sidebar from '../../components/Common/Sidebar/Sidebar.jsx';
import TopBar from '../../components/Common/Navbar/Toolbar.jsx'; 
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom'; 

// Components for each section
import Appointments from '../doctor/DoctorAppointments.jsx';
import Patients from '../Patient/PatientDashboard.jsx';

// Importing CSS
import './DoctorDashboard.css'; // Add your CSS here

const DoctorDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }} className="doctor-dashboard">
      {/* Sidebar */}
      <Sidebar className="sidebar" />

      {/* Main Dashboard Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }} className="main-content">
        {/* TopBar */}
        <TopBar className="top-bar" />

        <Typography variant="h3" component="h1" sx={{ textAlign: 'center', marginBottom: '30px' }}>
          Doctor Dashboard
        </Typography>

        {/* Dashboard Overview Tiles */}
        <Grid container spacing={3} sx={{ marginBottom: '30px' }} className="dashboard-tiles">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }} className="tile">
              <CardActionArea component={Link} to="/doctor/appointments">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                    Appointments
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
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
            <Card sx={{ height: '100%' }} className="tile">
              <CardActionArea component={Link} to="/doctor/patients">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                    Patients
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
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
            <Card sx={{ height: '100%' }} className="tile">
              <CardActionArea component={Link} to="/doctor/settings">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                    Settings
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
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
       
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
