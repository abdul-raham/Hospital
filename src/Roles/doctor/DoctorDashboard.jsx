import React from 'react';
import Sidebar from '../../components/Common/Sidebar/Sidebar';
import TopBar from '../../components/Navbar/Topbar.jsx';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';


const DoctorDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {/* TopBar */}
        <TopBar />

        <Typography variant="h3" component="h1" sx={{ textAlign: 'center', marginBottom: '30px' }}>
          Doctor Dashboard
        </Typography>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Appointments Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
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
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
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
    </Box>
  );
};

export default DoctorDashboard;
