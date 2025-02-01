import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/auth";

// Login function
export const login = async (email, password, hospitalId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
      hospitalId,
    });
    const { data } = response;
    // Store token securely
    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    console.error("Login error:", error.response);
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
    console.error("Sign-up error:", error.response);
    throw new Error(error.response?.data?.message || "Sign-up failed");
  }
};

// Logout function
export const logout = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return { message: "No active session found" };
    }
    await axios.post(
      `${API_BASE_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("authToken");
    return { message: "Logout successful" };
  } catch (error) {
    console.error("Logout error:", error.response);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
