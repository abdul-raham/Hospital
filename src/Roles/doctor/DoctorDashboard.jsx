import React from 'react';
import Sidebar from '../../components/Common/Sidebar';  // Import Sidebar
import TopBar from '../../components/Common/TopBar';    // Import TopBar
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import './styles.css';  // Import styles

const DoctorDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f4f7fc',
          padding: '20px',
          marginLeft: 240, // Sidebar width
        }}
      >
        {/* Top Bar */}
        <TopBar />

        {/* Main Content */}
        <Box sx={{ marginTop: '80px' }}>
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

            {/* Settings Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} sx={{ height: '200px' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Settings
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Manage your personal preferences and account settings.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
