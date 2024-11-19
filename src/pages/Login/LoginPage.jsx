// src/pages/Login/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; // Access Auth context

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
      
      <div className="login-container1">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="login-form" onSubmit={onSubmit}>
        <div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
          
        </button>
        <div className="login-footer">
            <a href="#">Forgot Password?</a>
          </div>
      </form>
      </div>
      <div className="login-container2">

      </div>

    </div>
  );
};

export default LoginPage;
