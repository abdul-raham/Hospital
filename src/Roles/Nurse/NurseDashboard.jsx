import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Common/Sidebar/Sidebar.jsx';
import TopBar from '../../components/Common/Navbar/Toolbar.jsx';
import './NurseDashboard.css';
import NurseAppointments from '../Nurse/NurseAppointments.jsx';
import CarePlans from '../Nurse/CarePlans.jsx';

const NurseDashboard = () => {
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  // Fetch appointment count (optional: if needed)
  useEffect(() => {
    // Logic to fetch appointments assigned to nurse (mocked or from Firebase)
    const fetchAppointmentsCount = async () => {
      // Example logic for fetching from Firebase or API
      // Replace this with actual implementation
      setAppointmentsCount(25); // Replace with fetched data
    };

    fetchAppointmentsCount();
  }, []);

  return (
    <Box sx={{ display: 'flex' }} className="nurse-dashboard">
      {/* Sidebar */}
      <Sidebar className="sidebar" />

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
        <Grid container spacing={3} sx={{ marginBottom: '30px' }} className="dashboard-tiles">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }} className="tile">
              <CardActionArea component={Link} to="/nurse/appointments">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '10px' }}>
                    Appointments
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {appointmentsCount} Upcoming
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View and manage assigned appointments.
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
                    80 Active Patients
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Access patient records and assist in patient care.
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
                    Update your profile and settings.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Routes>
          <Route path="/" element={<Typography variant="h5">Welcome to your dashboard!</Typography>} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default NurseDashboard;
