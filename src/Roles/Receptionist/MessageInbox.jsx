import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";

const MessageInbox = ({ userId, userType }) => {
  const [messages, setMessages] = useState([]);

  // Fetch messages from Firebase
  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `messages/${userType}/${userId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(
          Object.entries(data).map(([id, details]) => ({ id, ...details }))
        );
      }
    });
  }, [userId, userType]);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#437cf8",
        }}
      >
        Message Inbox
      </Typography>

      {/* Messages Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.sender}</TableCell>
                <TableCell>{message.content}</TableCell>
                <TableCell>
                  {new Date(message.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MessageInbox;
