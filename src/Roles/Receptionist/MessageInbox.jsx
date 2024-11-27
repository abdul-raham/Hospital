import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

const MessageInbox = ({ userId, userType }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("recipientId", "==", userId),
      where("recipientType", "==", userType)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [userId, userType]);

  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        Inbox
      </Typography>
      <List>
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            <ListItem>{msg.message}</ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default MessageInbox;
