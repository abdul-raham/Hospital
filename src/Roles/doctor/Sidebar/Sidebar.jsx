import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for detecting the active route

const Sidebar = () => {
  const location = useLocation(); // Get the current location (route)

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      sx={{width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#437cf8', // Dark background for sidebar
          color: 'white',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Border to give separation from content
          transition: 'background-color 0.3s ease', // Smooth background transition
          '&:hover': {
            backgroundColor: '#437cf8', // Lighter shade of dark gray on hover
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ paddingTop: '20px', marginTop:"20%" }}>
        {/* Dashboard Link */}
       

        {/* Appointments Link */}
        <ListItem
          button
          component={Link}
          to="/doctor/appointments"
          sx={{
            padding: '10px 20px',
            backgroundColor: isActive('/doctor/appointments') ? '#3f51b5' : 'transparent',
            '&:hover': { backgroundColor: '#3f51b5' },
          }}
        >
          <ListItemText primary="Appointments" sx={{ color: 'white' }} />
        </ListItem>

        {/* Patients Link */}
        <ListItem
          button
          component={Link}
          to="/doctor/patients"
          sx={{
            padding: '10px 20px',
            backgroundColor: isActive('/doctor/patients') ? '#2980b9' : 'transparent',
            '&:hover': { backgroundColor: '#2980b9' },
          }}
        >
          <ListItemText primary="Patients" sx={{ color: 'white' }} />
        </ListItem>

        {/* Settings Link */}
        <ListItem
          button
          component={Link}
          to="/doctor/settings"
          sx={{
            padding: '10px 20px',
            backgroundColor: isActive('/doctor/settings') ? '#2980b9' : 'transparent',
            '&:hover': { backgroundColor: '#2980b9' },
          }}
        >
          <ListItemText primary="Settings" sx={{ color: 'white' }} />
        </ListItem>

        {/* Additional Items can go here */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
