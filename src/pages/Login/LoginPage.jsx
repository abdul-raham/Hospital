// src/pages/Login/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import "../Login/LoginPage.css";
import Image from "../../components/Assets/pexels-shvetsa-4167541-removebg-preview.png";
 // Access Auth context

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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2>WELCOME</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
        <h1>Sign In</h1>
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
       
      </form>
      </div>
      <div className="login-container2"  style={{
    backgroundImage: `url(${Image})`,
    backgroundSize: 'contain', // Ensures the image covers the entire section
    backgroundRepeat:'no-repeat',
    backgroundPosition: 'center', // Centers the image
    height: '100vh', // Full viewport height
    width: '100%', // Full width
  }}>

      </div>

    </div>
  );
};

export default LoginPage;
