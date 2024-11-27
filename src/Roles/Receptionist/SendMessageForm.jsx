import React, { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { db } from "../../Firebase"; // Firebase Firestore instance
import { collection, getDocs, doc, query, where } from "firebase/firestore";

const SendMessageForm = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch recipients based on the selected role
  useEffect(() => {
    const fetchRecipientsByRole = async () => {
      if (!selectedRole) return; // Exit if no role is selected
      setLoading(true);
      setError("");
      setRecipients([]); // Reset recipients

      try {
        const collectionName = selectedRole === "doctor" ? "doctors" : "nurses";
        const parentCollection = collection(db, collectionName);
        const parentDocsSnapshot = await getDocs(parentCollection);

        if (!parentDocsSnapshot.empty) {
          let allRecipients = [];

          for (const parentDoc of parentDocsSnapshot.docs) {
            // Get subcollections for each parent document
            const subCollectionRef = collection(
              db,
              `${collectionName}/${parentDoc.id}` // Path to subcollection
            );

            const subCollectionSnapshot = await getDocs(subCollectionRef);

            if (!subCollectionSnapshot.empty) {
              const subCollectionRecipients = subCollectionSnapshot.docs.map(
                (doc) => ({
                  id: doc.id,
                  name: doc.data().name || "Unknown",
                  email: doc.data().email || "No Email",
                })
              );
              allRecipients = [...allRecipients, ...subCollectionRecipients];
            }
          }

          if (allRecipients.length > 0) {
            setRecipients(allRecipients);
          } else {
            setError(`No recipients found under ${selectedRole}.`);
          }
        } else {
          setError(`No ${selectedRole}s found.`);
        }
      } catch (err) {
        setError(
          "Failed to fetch recipients. Please check your Firestore setup."
        );
        console.error("Firestore error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipientsByRole();
  }, [selectedRole]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!selectedRecipient || !message) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        message,
        recipientId: selectedRecipient,
        recipientType: selectedRole,
        timestamp: new Date(),
      });

      setSuccess(true);
      setMessage("");
      setSelectedRole("");
      setSelectedRecipient("");
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", my: 4, padding: 2, boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom>
        Send Message
      </Typography>

      {/* Role Dropdown */}
      <TextField
        label="Role"
        variant="outlined"
        fullWidth
        select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        required
        sx={{ mb: 2 }}
      >
        <MenuItem value="doctor">Doctor</MenuItem>
        <MenuItem value="nurse">Nurse</MenuItem>
      </TextField>

      {/* Recipient Dropdown */}
      <TextField
        label="Recipient"
        variant="outlined"
        fullWidth
        select
        value={selectedRecipient}
        onChange={(e) => setSelectedRecipient(e.target.value)}
        disabled={!selectedRole || loading}
        required
        sx={{ mb: 2 }}
      >
        {recipients.length > 0 ? (
          recipients.map((recipient) => (
            <MenuItem key={recipient.id} value={recipient.id}>
              {recipient.name} - {recipient.email}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            {loading ? "Loading..." : "No recipients available"}
          </MenuItem>
        )}
      </TextField>

      {/* Message Input */}
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        disabled={loading}
      >
        Send Message
      </Button>

      {/* Success or Error Messages */}
      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          Message sent successfully!
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SendMessageForm;
