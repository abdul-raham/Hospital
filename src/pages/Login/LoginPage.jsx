import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import "../Login/LoginPage.css";
import Image from "../../components/Assets/pexels-shvetsa-4167541-removebg-preview.png";

const LoginPage = () => {
  const { login, loading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Redirect based on user role
  const handleRoleRedirect = async (currentUser) => {
    try {
      // Fetch user role from Firestore using email
      const userDoc = await getDoc(doc(db, "users", currentUser.email));
      if (userDoc.exists()) {
        const { role } = userDoc.data();

        // Redirect based on role
        switch (role) {
          case "doctor":
            navigate("/Doctor/");
            break;
          case "nurse":
            navigate("/Nurse");
            break;
          case "admin":
            navigate("/Admin");
            break;
          case "lab":
            navigate("/Lab");
            break;
          case "patient":
            navigate("/Patient");
            break;
          default:
            toast.error("User role not recognized.");
            navigate("/"); // Redirect to default page
        }
      } else {
        toast.error("User role not found in the database.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      toast.error("Failed to fetch user role.");
      navigate("/");
    }
  };

  // Listen to auth state changes and handle redirection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        handleRoleRedirect(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle login form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    try {
      // Perform login
      await login(email, password);
      toast.success("Login Successful! Redirecting...");
    } catch (error) {
      setErrorMessage(error.message || "Login failed.");
      toast.error(error.message || "Login failed.");
    }
  };

  const isFormValid = email && password && !loading;

  return (
    <div className="login-page">
      <div className="login-container1">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <h2>Welcome Back</h2>
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
