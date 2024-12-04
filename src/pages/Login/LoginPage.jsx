import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const { login, loading } = useAuthContext();
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

  // Extract role based on email format (name.role@gmail.com)
  const extractRoleFromEmail = (email) => {
    const role = email.split("@")[0].split(".")[1]; // Extract role from the email
    return role || null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous error message

    try {
      // Perform login
      await login(email.trim(), password);

      toast.success("Login successful!");

      // Extract role and navigate
      const role = extractRoleFromEmail(email);
      if (!role) {
        throw new Error("Invalid email format. Could not extract role.");
      }

      const redirectPath = rolePaths[role];
      if (!redirectPath) {
        throw new Error(`No path configured for role: ${role}`);
      }

      navigate(redirectPath);
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.message || "Login failed.");
      toast.error(error.message || "An error occurred during login.");
    }
  };

  return (
    <div style={loginPageStyles.container}>
      <div style={loginPageStyles.wrapper}>
        <div style={loginPageStyles.imageSection}></div>
        <div style={loginPageStyles.formSection}>
          <h2 style={loginPageStyles.title}>Login</h2>
          <form onSubmit={handleLogin} style={loginPageStyles.form}>
            <div style={loginPageStyles.inputGroup}>
              <label style={loginPageStyles.label}>Email</label>
              <input
                type="email"
                style={loginPageStyles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={loginPageStyles.inputGroup}>
              <label style={loginPageStyles.label}>Password</label>
              <input
                type="password"
                style={loginPageStyles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={loginPageStyles.errorMessage}>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
            <button
              type="submit"
              style={loginPageStyles.button}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const loginPageStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #a35dff, #3aa9ff)",
  },
  wrapper: {
    display: "flex",
    width: "900px",
    height: "500px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px)",
  },
  imageSection: {
    flex: 1.3,
    backgroundImage: "url('/src/components/Assets/pexels-shvetsa-4167541.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formSection: {
    flex: 2,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
  },
  title: { fontSize: "28px", fontWeight: "bold", marginBottom: "20px" },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    marginBottom: "15px",
    outline: "none",
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.4)",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #35c759, #2aa147)",
    color: "white",
    cursor: "pointer",
    width: "100%",
  },
};

export default LoginPage;
