import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Doctor Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/doctor/settings">
          Settings
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
