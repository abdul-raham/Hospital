import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const ReceptionistSidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#437cf8",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          borderBottom: "1px solid #ffffff",
        }}
      >
        Receptionist
      </Box>

      {/* Navigation List */}
      <List>
        {/* Dashboard Home */}
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Appointments */}
        <ListItem button component={Link} to="/appointments">
          <ListItemIcon>
            <CalendarMonthIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText primary="Appointments" />
        </ListItem>

        {/* Messages */}
        <ListItem button component={Link} to="/inbox">
          <ListItemIcon>
            <MailIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
    </Box>
  );
};

export default ReceptionistSidebar;
