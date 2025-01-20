import axios from "axios";

// API base URL
const API_BASE_URL = "http://localhost:5000/api/auth"; // Replace with your backend's API URL

// Login function
export const login = async (email, password, hospitalId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
      hospitalId,
    });
    // Store token or user details locally if needed
    const { data } = response;
    localStorage.setItem("authToken", data.token); // Example: Save token for authenticated requests
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Sign-up function
export const signUp = async (email, password, hospitalId, role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email,
      password,
      hospitalId,
      role,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sign-up failed");
  }
};

// Logout function
export const logout = async () => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.post(
      `${API_BASE_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token if required for logout
        },
      }
    );
    localStorage.removeItem("authToken"); // Clear token after logout
    return { message: "Logout successful" };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
