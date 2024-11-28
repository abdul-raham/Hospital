import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ReceptionistSidebar from "./ReceptionistSidebar"; // Ensure this path is correct
import ReceptionistHeader from "./ReceptionistHeader"; // Ensure this path is correct
import ReceptionistAppointments from "./ReceptionistAppointments"; // Ensure this path is correct
import SendMessageForm from "./SendMessageForm"; // Ensure this path is correct
import EditProfileReceptionist from "./EditProfileReceptionist"; // Import the edit profile form
import useAuth from "../../hooks/useAuth"; // Ensure useAuth is properly implemented and accessible

const ReceptionistDashboard = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { user, userRole, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect unauthorized users
  useEffect(() => {
    if (!loading && (!user || userRole !== "receptionist")) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [user, userRole, loading, navigate, location]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const handleToggleEditForm = () => {
    setShowEditForm((prev) => !prev); // Toggle form visibility
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          flexShrink: 0,
          backgroundColor: "#4caf50",
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
          overflowY: "auto",
          padding: "16px",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "16px" }}>
          <ReceptionistHeader onProfileClick={handleToggleEditForm} />
        </Box>

        {/* Dashboard Overview */}
        <Grid container spacing={2}>
          {/* Appointments Section */}
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

          {/* Messages Section */}
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

        {/* Edit Profile Section */}
        {showEditForm && (
          <Box
            sx={{
              marginTop: "24px",
              padding: "16px",
              border: "1px solid #437cf8",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              position: "relative",
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
              userId={user?.id || "currentReceptionistId"} // Replace with actual user ID
              onCloseForm={() => setShowEditForm(false)}
            />

            {/* Close Button */}
            <Box
              sx={{
                position: "absolute",
                top: "16px",
                right: "16px",
              }}
            >
              <button
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  backgroundColor: "#437cf8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setShowEditForm(false)}
              >
                Close
              </button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReceptionistDashboard;
