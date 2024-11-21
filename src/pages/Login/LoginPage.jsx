import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import "../Login/LoginPage.css";
import Image from "../../components/Assets/pexels-shvetsa-4167541-removebg-preview.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const { login, loading, user, role } = useAuthContext(); // Get role from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role) {
      // Redirect based on role
      switch (role) {
        case 'doctor':
          navigate('/Doctor');
          break;
        case 'nurse':
          navigate('/Nurse');
          break;
        case 'admin':
          navigate('/Admin');
          break;
        default:
          toast.error('Role not recognized. Please contact admin.');
          navigate('/'); // Default route
      }
    }
  }, [user, role, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await login(email, password); // Login function
      toast.success('Login successful! Redirecting...');
    } catch (error) {
      setErrorMessage(error.message || 'Login failed.');
      toast.error(error.message || 'Login failed.');
    }
  };

  const isFormValid = email && password && !loading;

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
          <button
            className="login-button"
            type="submit"
            disabled={loading || !isFormValid}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div
        className="login-container2"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
        }}
      />
    </div>
  );
};

export default LoginPage;
