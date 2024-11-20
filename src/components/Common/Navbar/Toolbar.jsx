import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';


const TopBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#34495e' }}>
      <Toolbar>
        {/* Logo or Dashboard Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Doctor Dashboard
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
