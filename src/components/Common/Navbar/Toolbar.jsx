import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation to get current route
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';

const TopBar = () => {
  // Use location to determine the current page
  const location = useLocation();

  // Dynamically set the title based on the route
  const getTitle = () => {
    switch (location.pathname) {
      case '/doctor/dashboard':
        return 'Doctor Dashboard';
      case '/nurse/dashboard':
        return 'Nurse Dashboard';
      case '/doctor/settings':
        return 'Doctor Settings';
      case '/nurse/settings':
        return 'Nurse Settings';
      case '/login':
        return 'Login';
      default:
        return 'Dashboard';  // Default title for unknown routes
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#34495e' }}>
      <Toolbar>
        {/* Dynamic Logo or Dashboard Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getTitle()}
        </Typography>

        {/* Settings Button */}
        <IconButton color="inherit" component={Link} to="/doctor/settings" sx={{ marginRight: 2 }}>
          <Settings />
        </IconButton>

        {/* Account Icon */}
        <IconButton color="inherit" component={Link} to="/doctor/profile">
          <AccountCircle />
        </IconButton>

        {/* Log Out Button */}
        <Button color="inherit" component={Link} to="/login">
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
