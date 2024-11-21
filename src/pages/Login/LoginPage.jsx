import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';  // Importing the context hook
import "../Login/LoginPage.css";
import Image from "../../components/Assets/pexels-shvetsa-4167541-removebg-preview.png"; // Adjust path to your image
import { toast } from 'react-toastify'; // Importing the toast function
import 'react-toastify/dist/ReactToastify.css'; // Importing the necessary CSS for toast notifications

const LoginPage = () => {
  const { login, loading, user } = useAuthContext();  // Destructure the `login` function and `loading` from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to their dashboard (or role-based dashboard)
    if (user) {
      navigate('/Doctor');  // Redirect to the Doctor dashboard (or role-based navigation)
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');  // Clear any previous error messages
    try {
      // Call the login function from context
      await login(email, password);
      // Show success toast after successful login
      toast.success('Login Successful! Redirecting...');
      // After successful login, user will be redirected based on the above `useEffect`
    } catch (error) {
      // Handle login errors
      setErrorMessage(error.message || 'Login failed.');
      toast.error(error.message || 'Login failed.');
    }
  };

  // Disable the login button if email or password is empty, or if loading
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
            disabled={loading || !isFormValid}  // Disable if loading or form is invalid
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
