import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; // Context for login and user management
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../Firebase'; // Firebase configuration
import "../Login/LoginPage.css";
import Image from "../../components/Assets/pexels-shvetsa-4167541-removebg-preview.png";

const LoginPage = () => {
  const { login, loading, user } = useAuthContext(); // Destructure login and user from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          // Fetch the user document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userRole = userData.role;

            // Redirect based on role
            switch (userRole) {
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
                toast.error('Role not recognized.');
                navigate('/');
            }
          } else {
            toast.error('User role not found.');
            navigate('/');
          }
        } catch (error) {
          toast.error('Failed to fetch user role.');
        }
      }
    };

    fetchUserRole();
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      // Login with Firebase Authentication
      await login(email, password);
      toast.success('Login Successful! Redirecting...');
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
            {loading ? 'Logging in...' : 'Login'}
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
