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

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous error message

    console.log("Login attempt for:", email); // Log email before login

    try {
      console.log("Before login. Loading:", loading); // Log loading state before the login process

      // Perform login
      await login(email.trim(), password);

      console.log("After login. Loading:", loading); // Log loading state after the login process

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

      console.log("Role extracted:", role); // Debug log
      console.log("Redirecting to:", redirectPath); // Debug log
      navigate(redirectPath);
    } catch (error) {
      console.error("Error during login:", error); // Log detailed error
      setErrorMessage(error.message || "Login failed.");
      toast.error(error.message || "An error occurred during login.");
    }
  };

  return (
    <div style={loginPageStyles.container}>
      <div style={loginPageStyles.wrapper}>
        <div style={loginPageStyles.imageSection}></div>
        <div style={loginPageStyles.formSection}>
          <h2 style={loginPageStyles.title}>LOGIN</h2>
          <form onSubmit={handleLogin}>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={loginPageStyles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={loginPageStyles.input}
            />
            <button
              type="submit"
              disabled={loading}
              style={loginPageStyles.button}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const extractRoleFromEmail = (email) => {
  // Example role extraction logic based on email
  const roleMatch = email.match(
    /@(doctor|nurse|admin|lab|patient|receptionist)\.com$/
  );
  return roleMatch ? roleMatch[1] : null;
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
