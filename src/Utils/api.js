// src/api.js
import axios from 'axios';

// Define base API URL
const API_URL = 'http://localhost:5000/api';

// Set up Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API call (using email & password from frontend)
export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;  // Return data from backend (including token and role)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Fetch user appointments from the backend (example API endpoint)
export const getAppointmentsApi = async (token) => {
  try {
    const response = await axiosInstance.get('/appointments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return appointments data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch appointments');
  }
};
