import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { db } from "../../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const ReceptionistMessages = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState(""); // Selected recipient's ID
  const [recipientType, setRecipientType] = useState(""); // Doctor or Nurse
  const [recipients, setRecipients] = useState([]); // List of users (doctors and nurses)
  const [messages, setMessages] = useState([]);

  // Fetch the list of recipients (doctors and nurses) from Firestore
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const usersQuery = query(collection(db, "users"));
        const querySnapshot = await getDocs(usersQuery);
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipients(users);
        console.log("Fetched Recipients:", users); // Check the fetched users data
      } catch (error) {
        console.error("Error fetching recipients: ", error);
      }
    };

    fetchRecipients();
  }, []);

  // Handle sending the message
  const handleSendMessage = async () => {
    if (!recipient || !recipientType || !message.trim()) {
      alert("Please select a recipient, type, and enter a message.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        recipientId: recipient,
        recipientType,
        message,
        timestamp: new Date(),
      });
      console.log("Message sent with ID: ", docRef.id);
      setMessage("");
      setRecipient("");
      setRecipientType("");
    } catch (e) {
      console.error("Error sending message: ", e);
    }
  };

  // Fetch messages for the selected recipient in real-time
  useEffect(() => {
    if (recipient) {
      const q = query(
        collection(db, "messages"),
        where("recipientId", "==", recipient)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push(doc.data());
        });
        setMessages(messagesData);
      });

      return () => unsubscribe();
    }
  }, [recipient]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Send Message to Doctor or Nurse
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Recipient Type</InputLabel>
        <Select
          value={recipientType}
          onChange={(e) => setRecipientType(e.target.value)}
        >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="nurse">Nurse</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Recipient</InputLabel>
        <Select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        >
          {recipients
            .filter((user) => user.role === recipientType) // Filter by selected role
            .map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={handleSendMessage}>
        Send Message
      </Button>

      <Box mt={3}>
        <Typography variant="h6">Messages:</Typography>
        <List>
          {messages.map((msg, index) => (
            <React.Fragment key={index}>
              <ListItem>{msg.message}</ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ReceptionistMessages;
