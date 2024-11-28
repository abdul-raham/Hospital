import React from "react";
import EditProfile from "../shared/EditProfile"; // Reusable component

const EditProfileNurse = () => {
  // Assuming userId and role are fetched from context, props, or auth state
  const userId = "kZN5iFqQGzg72gP4SmhV6sl9d7G2"; // Replace with dynamic userId
  const role = "nurse";

  return <EditProfile userId={userId} role={role} />;
};

export default EditProfileNurse;
