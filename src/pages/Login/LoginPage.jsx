import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db, populateHospitalData } from "../../Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const { loading, userRole } = useAuthContext(); // Get loading status and user role from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitals, setHospitals] = useState([]); // State for storing hospital list
  const [selectedHospital, setSelectedHospital] = useState("");
  const [hospitalLoading, setHospitalLoading] = useState(true); // Loading state for hospital dropdown
  const [loginLoading, setLoginLoading] = useState(false); // Loading state for login process
  const navigate = useNavigate();

  /** Fetch hospitals from Firestore on component mount */
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // Populate hospital data if not already present
        await populateHospitalData();

        const snapshot = await getDocs(collection(db, "hospitals"));
        if (snapshot.empty) {
          throw new Error("No hospitals found in the database.");
        }

        const hospitalList = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setHospitals(hospitalList);
      } catch (error) {
        console.error("Error fetching hospitals: ", error.message);
        toast.error("Failed to load hospitals.");
      } finally {
        setHospitalLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  /** Handle the login process */
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoginLoading(true);

    if (!selectedHospital) {
      setErrorMessage("Please select a hospital to log in.");
      toast.error("Please select a hospital.");
      setLoginLoading(false);
      return;
    }

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Get the custom claims from the user's token
      const tokenResult = await userCredential.user.getIdTokenResult();
      const hospitalId = tokenResult.claims?.hospitalId;

      if (!hospitalId || hospitalId !== selectedHospital) {
        throw new Error("You do not have access to this hospital.");
      }

      toast.success("Login successful!");
      navigate(`/${userRole}`); // Redirect based on role
    } catch (error) {
      console.error("Login failed: ", error.message);

      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setErrorMessage("Invalid email or password.");
        toast.error("Invalid email or password.");
      } else if (error.message.includes("access to this hospital")) {
        setErrorMessage("You do not have access to this hospital.");
        toast.error("You do not have access to this hospital.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div style={loginPageStyles.container}>
      <div style={loginPageStyles.wrapper}>
        {/* Left Section */}
        <div style={loginPageStyles.leftSection}>
          {/* Add background image with alt text */}
          <img
            src="../src/components/Assets/doctor-dash.png"
            alt="Hospital illustration"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right Form Section */}
        <div style={loginPageStyles.formSection}>
          <h2 style={loginPageStyles.title}>Hospital Login</h2>
          <form onSubmit={handleLogin} style={loginPageStyles.form}>
            {/* Dropdown to select hospital */}
            <div style={loginPageStyles.inputGroup}>
              <label style={loginPageStyles.label}>Select Hospital</label>
              <select
                style={loginPageStyles.input}
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                disabled={hospitalLoading} // Disable until hospitals load
              >
                <option value="">
                  {hospitalLoading
                    ? "Loading hospitals..."
                    : "--Select a hospital--"}
                </option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
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
                required
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
                required
              />
            </div>

            {/* Display any error messages */}
            {errorMessage && (
              <div style={loginPageStyles.errorMessage}>
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              style={loginPageStyles.button}
              disabled={loginLoading || hospitalLoading}
            >
              {loginLoading ? "Logging in..." : "Login"}
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
    marginBottom: "10px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
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
    marginBottom: "10px",
  },
};

export default LoginPage;
