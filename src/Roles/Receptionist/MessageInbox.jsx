import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

const MessageInbox = ({ userId, userType }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("recipientId", "==", userId),
      where("recipientType", "==", userType),
      orderBy("timestamp", "desc"),
      limit(10) // Load only the most recent 10 messages
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [userId, userType]);

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
