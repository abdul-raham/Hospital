import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const ReceptionistHeader = ({ title }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        color: "#000000",
        boxShadow: 1,
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#437cf8",
          }}
        >
          {title}
        </Typography>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notifications Icon */}
          <NotificationsIcon sx={{ color: "#437cf8", cursor: "pointer" }} />

          {/* Settings Icon */}
          <SettingsIcon sx={{ color: "#437cf8", cursor: "pointer" }} />

          {/* Avatar */}
          <Avatar
            sx={{
              backgroundColor: "#437cf8",
              cursor: "pointer",
            }}
          >
            R
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ReceptionistHeader;
