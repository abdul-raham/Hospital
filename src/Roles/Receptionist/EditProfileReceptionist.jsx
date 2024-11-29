import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { storage, db } from "../../Firebase"; // Correct the path
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed
import "react-toastify/dist/ReactToastify.css"

const EditProfileReceptionist = ({ userId, onCloseForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    profilePicture: null, // Store the file object
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      const file = files[0];
      if (file && file.size > 1024 * 1024) {
        // 1MB in bytes
        toast.error("Image must be less than 1MB.");
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsUploading(true);

      let profilePictureUrl = null;

      // Upload profile picture if a new file is selected
      if (formData.profilePicture) {
        const storageRef = ref(
          storage,
          `profilePictures/${formData.profilePicture.name}`
        );
        const uploadTask = uploadBytesResumable(
          storageRef,
          formData.profilePicture
        );

        // Wait for the upload to complete
        await uploadTask;
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Update Firestore with new profile data
      const userRef = doc(db, "users", userId); // Adjust the collection name if needed
      await updateDoc(userRef, {
        name: formData.name,
        fullName: formData.fullName,
        profilePicture: profilePictureUrl || null, // Only update if there is a picture
      });

      toast.success("Profile edited successfully!");
      onCloseForm(); // Call the parent function to hide the form
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to edit profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Edit Profile
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <input
        type="file"
        name="profilePicture"
        accept="image/*"
        onChange={handleChange}
        style={{ marginBottom: "16px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isUploading}
      >
        {isUploading ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
};

export default EditProfileReceptionist;
