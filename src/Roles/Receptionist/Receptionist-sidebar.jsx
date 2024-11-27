import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Function to determine active state of the route
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <Drawer
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#4caf50", // Green background
          color: "white", // White text
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {/* Dashboard Home */}
        <ListItem
          button
          component={Link}
          to="/receptionist"
          sx={{
            backgroundColor:
              isActive("/receptionist") && location.pathname === "/receptionist"
                ? "#388e3c" // Darker green for active state
                : "transparent",
            "&:hover": { backgroundColor: "#388e3c" }, // Dark green on hover
          }}
        >
          <ListItemText primary="Dashboard Home" />
        </ListItem>

        {/* Manage Appointments */}
        <ListItem
          button
          component={Link}
          to="/receptionist/appointments"
          sx={{
            backgroundColor: isActive("/receptionist/appointments")
              ? "#388e3c"
              : "transparent",
            "&:hover": { backgroundColor: "#388e3c" },
          }}
        >
          <ListItemText primary="Manage Appointments" />
        </ListItem>

        {/* Messages */}
        <ListItem
          button
          component={Link}
          to="/receptionist/messages"
          sx={{
            backgroundColor: isActive("/receptionist/messages")
              ? "#388e3c"
              : "transparent",
            "&:hover": { backgroundColor: "#388e3c" },
          }}
        >
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
