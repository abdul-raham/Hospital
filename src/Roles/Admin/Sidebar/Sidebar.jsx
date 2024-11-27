import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: "#3f51b5",
        color: "white",
        height: "100vh",
        padding: 3,
      }}
    >
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" color="inherit">
          Care Master
        </Typography>
      </Box>
      <List>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/admin"
                style={{ color: "white", textDecoration: "none" }}
              >
                Dashboard
              </Link>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/patient"
                style={{ color: "white", textDecoration: "none" }}
              >
                Patients
              </Link>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/doctor"
                style={{ color: "white", textDecoration: "none" }}
              >
                Doctors
              </Link>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/nurse"
                style={{ color: "white", textDecoration: "none" }}
              >
                Nurses
              </Link>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/receptionist"
                style={{ color: "white", textDecoration: "none" }}
              >
                Receptionist
              </Link>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/settings"
                style={{ color: "white", textDecoration: "none" }}
              >
                Settings
              </Link>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/calendar"
                style={{ color: "white", textDecoration: "none" }}
              >
                Calendar
              </Link>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
