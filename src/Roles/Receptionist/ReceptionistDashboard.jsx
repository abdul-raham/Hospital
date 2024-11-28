import React, { useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import ReceptionistSidebar from "./ReceptionistSidebar"; // Ensure this path is correct
import ReceptionistHeader from "./ReceptionistHeader"; // Ensure this path is correct
import ReceptionistAppointments from "./ReceptionistAppointments"; // Ensure this path is correct
import SendMessageForm from "./SendMessageForm"; // Ensure this path is correct
import EditProfileReceptionist from "./EditProfileReceptionist"; // Import the edit profile form

const ReceptionistDashboard = () => {
  const [showEditForm, setShowEditForm] = useState(false); // State to toggle the edit profile form

  const handleToggleEditForm = () => {
    setShowEditForm((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevent horizontal/vertical scroll
        backgroundColor: "#f5f5f5", // Light background color
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px", // Sidebar width
          flexShrink: 0,
          backgroundColor: "#4caf50", // Green background for the sidebar
          color: "#fff",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ReceptionistSidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto", // Allow only vertical scrolling
          padding: "16px",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "16px" }}>
          <ReceptionistHeader onProfileClick={handleToggleEditForm} />
        </Box>

        {/* Dashboard Overview */}
        <Grid container spacing={2}>
          {/* Appointments */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                padding: "16px",
                borderRadius: "8px",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#437cf8",
                }}
              >
                Manage Appointments
              </Typography>
              <ReceptionistAppointments />
            </Paper>
          </Grid>

          {/* Messages */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                padding: "16px",
                borderRadius: "8px",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#437cf8",
                }}
              >
                Messages
              </Typography>
              <SendMessageForm />
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Profile Form */}
        {showEditForm && (
          <Box
            sx={{
              marginTop: "24px",
              padding: "16px",
              border: "1px solid #437cf8",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
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
