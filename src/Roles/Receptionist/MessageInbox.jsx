import React, { useState, useEffect } from "react";
import { db } from "../../Firebase"; // Import Firebase db
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const MessageInbox = ({ userId, userType }) => {
  const [messages, setMessages] = useState([]);

  // Fetch messages for the recipient in real-time
  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(db, "messages"),
        where("recipientId", "==", userId),
        where("recipientType", "==", userType)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push(doc.data());
        });
        setMessages(messagesData);
        console.log("Fetched Messages:", messagesData); // Add this line to check data
      });

      return () => unsubscribe();
    };

    if (userId && userType) {
      fetchMessages();
    }
  }, [userId, userType]); // Re-run when userId or userType changes

  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        Inbox
      </Typography>
      {messages.length > 0 ? (
        <List>
          {messages.map((msg, index) => (
            <React.Fragment key={index}>
              <ListItem>{msg.message}</ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body2">No messages available.</Typography>
      )}
    </Box>
  );
};

export default MessageInbox;
