// Receptionist-header.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const TopBar = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#388e3c", // Green background
        color: "#fff", // White text
        px: 3,
        py: 2,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)", // Shadow effect
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      {/* Title */}
      <Typography variant="h6" component="div">
        {title}
      </Typography>

      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        onClick={() => alert("Logged out!")} // Replace with actual logout functionality
      >
        Logout
      </Button>
    </Box>
  );
};

export default TopBar;
