// src/pages/Login/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; // Access Auth context
import '../Login/LoginPage.css'; // Import component-specific styles

const LoginPage = () => {
  const { handleLogin, loading } = useAuthContext(); // Get login functionality from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password); // Call login function from context
      navigate('/doctor'); // Redirect to the doctor dashboard after successful login (change as needed)
    } catch (error) {
      setErrorMessage(error.message || "Login failed.");
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
    <div className="login-header">
          
          <h2>Welcome to [Hospital Name]</h2>
        </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={onSubmit} className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="login-footer">
          <a href="#">Forgot Password?</a> 
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
