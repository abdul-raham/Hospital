import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ReceptionistSidebar from "./ReceptionistSidebar";
import ReceptionistHeader from "./ReceptionistHeader";
import ReceptionistAppointments from "./ReceptionistAppointments";
import MessageInbox from "./MessageInbox";
import SendMessageForm from "./SendMessageForm";
import { Routes, Route } from "react-router-dom";

const ReceptionistDashboard = () => {
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
        <ReceptionistHeader title="Receptionist Dashboard" />

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

        {/* Routes for dynamic content */}
        <Routes>
          <Route
            path="/"
            element={
              <Typography variant="h6">
                Welcome to the Receptionist Dashboard
              </Typography>
            }
          />
          <Route path="appointments" element={<ReceptionistAppointments />} />
          <Route path="inbox" element={<MessageInbox />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default ReceptionistDashboard;
