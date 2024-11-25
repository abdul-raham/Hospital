import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#2c3e50", // Dark blue background
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ paddingTop: "20px" }}>
        <ListItem
          button
          component={Link}
          to="/nurse"
          sx={{
            padding: "10px 20px",
            backgroundColor: isActive("/nurse") ? "#2980b9" : "transparent",
            "&:hover": { backgroundColor: "#2980b9" },
          }}
        >
          <ListItemText primary="Dashboard" sx={{ color: "white" }} />
        </ListItem>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        <ListItem
          button
          component={Link}
          to="/nurse/appointments"
          sx={{
            padding: "10px 20px",
            backgroundColor: isActive("/nurse/appointments") ? "#2980b9" : "transparent",
            "&:hover": { backgroundColor: "#2980b9" },
          }}
        >
          <ListItemText primary="Appointments" sx={{ color: "white" }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/nurse/patients"
          sx={{
            padding: "10px 20px",
            backgroundColor: isActive("/nurse/patients") ? "#2980b9" : "transparent",
            "&:hover": { backgroundColor: "#2980b9" },
          }}
        >
          <ListItemText primary="Patients" sx={{ color: "white" }} />
        </ListItem>

        <ListItem
  button
  component={Link}
  to="/nurse/tasks"
  sx={{
    padding: "10px 20px",
    backgroundColor: isActive("/nurse/tasks") ? "#2980b9" : "transparent",
    "&:hover": { backgroundColor: "#2980b9" },
  }}
>
  <ListItemText primary="Tasks" sx={{ color: "white" }} />
</ListItem>

      </List>
    </Drawer>
  );
};

export default Sidebar;
