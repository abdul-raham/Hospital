import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import "./LoginPage.css";

// Import the image
import loginImage from "../../components/Assets/pexels-shvetsa-4167541.jpg";

const LoginPage = () => {
  const { login, loading, userRole } = useAuthContext(); // Use login and userRole from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const rolePaths = {
    doctor: "/doctor",
    nurse: "/nurse",
    admin: "/admin",
    lab: "/lab",
    patient: "/patient",
    receptionist: "/receptionist",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await login(email.trim(), password);
      toast.success("Login successful!");

      // Redirect based on user role
      const redirectPath = rolePaths[userRole] || "/"; // Default to '/' if no role found
      navigate(redirectPath);
    } catch (error) {
      setErrorMessage(error.message || "Login failed.");
      toast.error(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
        <div className="login-form-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
