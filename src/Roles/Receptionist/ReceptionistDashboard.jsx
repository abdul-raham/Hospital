import React, { useState, useEffect } from "react";
import Sidebar from "./Receptionist-sidebar.jsx";
import TopBar from "./Receptionist-header.jsx";
import "./ReceptionistDashboard.css";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  MenuItem,
} from "@mui/material";
import { db } from "../../Firebase"; // Ensure Firebase is initialized
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const ReceptionistDashboard = () => {
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [recipientType, setRecipientType] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);

  // Fetch recipients (e.g., doctors, nurses)
  useEffect(() => {
    const recipientsQuery = query(collection(db, "users"));
    const unsubscribe = onSnapshot(recipientsQuery, (querySnapshot) => {
      const fetchedRecipients = [];
      querySnapshot.forEach((doc) => {
        fetchedRecipients.push({ id: doc.id, ...doc.data() });
      });
      setRecipients(fetchedRecipients);
    });

    return () => unsubscribe();
  }, []);

  // Fetch messages
  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (!recipientId || !recipientType || !message) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "messages"), {
        recipientId,
        recipientType,
        message,
        timestamp: new Date(),
      });
      setMessage("");
      setRecipientId("");
      setRecipientType("");
    } catch (e) {
      console.error("Error sending message: ", e);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

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
        {/* TopBar */}
        <TopBar title="Receptionist Dashboard" />

        {/* Overview Tiles */}
        <Grid container spacing={3} sx={{ mb: 3, marginTop: "5%" }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Manage Appointments
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add and view appointments for doctors and nurses.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Messaging Form */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Send Message
          </Typography>
          <Grid container spacing={2}>
            {/* Recipient Dropdown */}
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Recipient"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                fullWidth
              >
                {recipients.map((recipient) => (
                  <MenuItem
                    key={recipient.id}
                    value={recipient.id}
                    onClick={() => setRecipientType(recipient.role)}
                  >
                    {recipient.name} ({recipient.role})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Message Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            {/* Send Button */}
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSendMessage}>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Message Inbox */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Messages Sent
          </Typography>
          <List>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <Typography>
                    <strong>To:</strong> {msg.recipientType} - {msg.recipientId}
                    <br />
                    <strong>Message:</strong> {msg.message}
                    <br />
                    <strong>Sent At:</strong>{" "}
                    {new Date(msg.timestamp.seconds * 1000).toLocaleString()}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ReceptionistDashboard;
