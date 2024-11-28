import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Login/LoginPage.css";
import Image from "../../components/Assets/pexels-shvetsa-4167541-removebg-preview.png";

const LoginPage = () => {
  const { login, loading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
    } catch (error) {
      const errorMsg =
        error?.message || "Invalid credentials. Please try again.";
      toast.error(errorMsg);
    }
  };

  const isFormValid = email && password && !loading;

  return (
    <div className="login-page">
      <div className="login-container1">
        <h2>Welcome Back</h2>
        <form className="login-form" onSubmit={onSubmit}>
          <h1>Sign In</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button
            className="login-button"
            type="submit"
            disabled={!isFormValid}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div
        className="login-container2"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      />
    </div>
  );
};

export default LoginPage;
