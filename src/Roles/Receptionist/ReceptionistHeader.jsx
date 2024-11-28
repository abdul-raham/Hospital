import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ReceptionistHeader = ({ onProfileClick }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#437cf8" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Receptionist Dashboard
        </Typography>
        <IconButton
          color="inherit"
          onClick={onProfileClick} // Trigger the toggle function
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ReceptionistHeader;
