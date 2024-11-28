import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ReceptionistSidebar from "./ReceptionistSidebar"; // Ensure this path is correct
import ReceptionistHeader from "./ReceptionistHeader"; // Ensure this path is correct
import ReceptionistAppointments from "./ReceptionistAppointments"; // Ensure this path is correct
import SendMessageForm from "./SendMessageForm"; // Ensure this path is correct
import EditProfileReceptionist from "./EditProfileReceptionist"; // Import the edit profile form

const ReceptionistDashboard = () => {
  const [showEditForm, setShowEditForm] = useState(false); // State to toggle the edit profile form

  // Function to toggle the profile form visibility
  const handleToggleEditForm = () => {
    setShowEditForm((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#ffffff",
        color: "text.primary",
      }}
    >
      {/* Sidebar */}
      <ReceptionistSidebar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <ReceptionistHeader onProfileClick={handleToggleEditForm} />

        {/* Dashboard Overview */}
        <Grid container spacing={3} sx={{ mb: 3, marginTop: "5%" }}>
          {/* Appointments */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#437cf8",
              }}
            >
              Manage Appointments
            </Typography>
            <ReceptionistAppointments />
          </Grid>

          {/* Messages */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#437cf8",
              }}
            >
              Messages
            </Typography>
            <SendMessageForm />
          </Grid>
        </Grid>

        {/* Edit Profile Form */}
        {showEditForm && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #437cf8",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#437cf8",
              }}
            >
              Edit Profile
            </Typography>
            <EditProfileReceptionist
              userId="currentUserId"
              onCloseForm={() => setShowEditForm(false)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReceptionistDashboard;
