import React from "react";
import EditProfile from "../shared/EditProfile"; // Reusable component

const EditProfileDoctor = () => {
  // Assuming userId and role are fetched from context, props, or auth state
  const userId = "Ez6DOI1iBKX3VNQlr70a9GMBSKi2"; // Replace with dynamic userId
  const role = "doctor";

  return <EditProfile userId={userId} role={role} />;
};

export default EditProfileDoctor;
