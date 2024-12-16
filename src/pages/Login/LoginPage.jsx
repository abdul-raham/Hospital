import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

const LoginPage = () => {
  const { login, loading, userRole } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitals, setHospitals] = useState([]); 
  const [selectedHospital, setSelectedHospital] = useState(""); 
  const navigate = useNavigate();

  // Fetch hospitals from Firestore
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const snapshot = await getDocs(collection(db, "hospitals")); // Query all hospitals
        const hospitalList = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unknown Hospital",
        }));
        setHospitals(hospitalList);
      } catch (error) {
        console.error("Error fetching hospitals: ", error);
        toast.error("Failed to load hospitals.");
      }
    };
    fetchHospitals();
  }, []);

  // Handle login functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!selectedHospital) {
      setErrorMessage("Please select a hospital to log in.");
      toast.error("Please select a hospital.");
      return;
    }

    try {
      await login(email.trim(), password, selectedHospital);
      toast.success("Login successful!");

      if (userRole) {
        navigate(`/${userRole}`);
      } else {
        throw new Error("User role undefined.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.message || "Login failed.");
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div style={loginPageStyles.container}>
      <div style={loginPageStyles.wrapper}>
        <div style={loginPageStyles.leftSection}></div>
        <div style={loginPageStyles.formSection}>
          <h2 style={loginPageStyles.title}>Hospital Login</h2>
          <form onSubmit={handleLogin} style={loginPageStyles.form}>
            {/* Dropdown for Hospital Selection */}
            <div style={loginPageStyles.inputGroup}>
              <label style={loginPageStyles.label}>Select Hospital</label>
              <select
                style={loginPageStyles.input}
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                <option value="">--Select a hospital--</option>
                {hospitals.length > 0 ? (
                  hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading hospitals...</option>
                )}
              </select>
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Error Message */}
            {errorMessage && (
              <div style={loginPageStyles.errorMessage}>
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
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

// Add styles
const loginPageStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  },
  wrapper: {
    display: "flex",
    width: "90%",
    height: "90%",
    maxWidth: "1100px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
  }, 
  leftSection: {
    flex: 1,
    background: `url('/path-to-your-image.jpg') no-repeat center center / cover`,
  },
  formSection: {
    flex: 1,
    padding: "30px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#fff",
    color: "#333",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#333",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    backgroundColor: "#2575fc",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default LoginPage;
