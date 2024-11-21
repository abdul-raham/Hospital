import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for detecting the active route

const Sidebar = () => {
  const location = useLocation(); // Get the current location (route)

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#2c3e50', // Dark background for sidebar
          color: 'white',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Border to give separation from content
          transition: 'background-color 0.3s ease', // Smooth background transition
          '&:hover': {
            backgroundColor: '#34495e', // Lighter shade of dark gray on hover
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ paddingTop: '20px' }}>
        {/* Dashboard Link */}
        <ListItem
          button
          component={Link}
          to="/nurse"
          sx={{
            padding: '10px 20px',
            backgroundColor: isActive('/nurse') ? '#2980b9' : 'transparent', // Active link background color
            '&:hover': { backgroundColor: '#2980b9' },
          }}
        >
          <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
        </ListItem>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Appointments Link */}
        <ListItem
          button
          component={Link}
          to="/nurse/appointments"
          sx={{
            padding: '10px 20px',
            backgroundColor: isActive('/nurse/appointments') ? '#2980b9' : 'transparent',
            '&:hover': { backgroundColor: '#2980b9' },
          }}
        >
          <ListItemText primary="Appointments" sx={{ color: 'white' }} />
        </ListItem>

        {/* Patients Link */}
        <ListItem
          button
          component={Link}
          to="/nurse/patients"
          sx={{
            padding: '10px 20px',
            backgroundColor: isActive('/nurse/patients') ? '#2980b9' : 'transparent',
            '&:hover': { backgroundColor: '#2980b9' },
          }}
        >
          <ListItemText primary="Patients" sx={{ color: 'white' }} />
        </ListItem>

        {/* Settings Link */}
        <ListItem
          button
          component={Link}
          to="/nurse/settings" // Corrected link to /nurse/settings
          sx={{
            padding: '10px 20px',
            backgroundColor: isActive('/nurse/settings') ? '#2980b9' : 'transparent',
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

export default Sidebar; // Default export
