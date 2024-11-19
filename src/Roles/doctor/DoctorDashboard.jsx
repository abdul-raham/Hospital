import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material'; // Importing MUI components
import './DoctorAppointments'; 
import '../doctor/DoctorDashboard.css';

const DoctorDashboard = () => {
  return (
    <Box className="doctor-dashboard" sx={{ padding: '20px', backgroundColor: '#f4f7fc' }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
        <Typography variant="h3" component="h1" color="primary" sx={{ fontWeight: 700 }}>
          Doctor Dashboard
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Grid container spacing={3} justifyContent="center">
        {/* Appointments Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Appointments
              </Typography>
              <Typography variant="body2" color="textSecondary">
                View and manage your scheduled appointments.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Patient Records Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Patient Records
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Access detailed patient records and history.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;
