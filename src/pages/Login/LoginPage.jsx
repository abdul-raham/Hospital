import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import "../Login/LoginPage.css";
import Image from "../../components/Assets/pexels-shvetsa-4167541-removebg-preview.png";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Firebase'; // Firebase config file
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import { extractRoleFromEmail } from '../../Utils/Utils.js';  // Import utility function

// Available dashboards for different roles
const dashboards = {
  doctor: "/doctor-dashboard",
  nurse: "/nurse-dashboard",
  patient: "/patient-dashboard",
  lab: "/lab-dashboard",
  admin: "/admin-dashboard",
};

const LoginPage = () => {
  const { handleLogin, loading } = useAuthContext(); // Get login functionality from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      // Authenticate the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Extract role from email (e.g., name.nurse@gmail.com -> "nurse")
      const roleFromEmail = extractRoleFromEmail(email);

      // Verify role (optional, can be checked in Firestore for added security)
      const isRoleValid = await verifyRoleWithFirestore(userId, roleFromEmail);
      if (!isRoleValid) {
        throw new Error('Invalid role or role mismatch!');
      }

      // Redirect user to their respective dashboard based on the extracted role
      redirectToDashboard(roleFromEmail);

    } catch (error) {
      setErrorMessage(error.message || 'Login failed.');
    }
  };

  const verifyRoleWithFirestore = async (userId, roleFromEmail) => {
    try {
      // Fetch the user document from Firestore using the correct userId
      const userDocRef = doc(db, 'users', userId); // Ensure the path to the document is correct
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Normalize both roles to lower case to avoid case sensitivity issues
        if (userData.role.toLowerCase() === roleFromEmail.toLowerCase()) {
          return true;  // If roles match, return true
        } else {
          return false;  // Role mismatch
        }
      } else {
        return false;  // If the user document doesn't exist
      }
    } catch (error) {
      return false;  // Handle any error that occurs during the verification process
    }
  };

  // Function to redirect the user to the appropriate dashboard
  const redirectToDashboard = (role) => {
    if (dashboards[role]) {
      console.log("Navigating to:", dashboards[role]);
      navigate(dashboards[role]); // Redirect to the appropriate dashboard
    } else {
      setErrorMessage('Invalid role or dashboard not defined!');
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
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', // Centers the image
        height: '100vh', // Full viewport height
        width: '100%', // Full width
      }}>
      </div>
    </div>
  );
};

export default LoginPage;
