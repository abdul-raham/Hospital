import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [hospitalLoading, setHospitalLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoginLoading(true);

    if (!selectedHospital) {
      setErrorMessage("Please select a hospital.");
      toast.error("Please select a hospital.");
      setLoginLoading(false);
      return;
    }

    const auth = getAuth();

    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User not found in database.");
      }

      const userData = userDoc.data();
      console.log("User data:", userData);

      // Check if the user belongs to the selected hospital
      if (userData.hospitalId !== selectedHospital) {
        await signOut(auth);
        throw new Error("You do not have access to this hospital.");
      }

      // Ensure the user has a valid role
      if (!userData.role) {
        await signOut(auth);
        throw new Error("Role information is missing.");
      }

      toast.success("Login successful!");

      // Redirect user based on role
      const roleRoutes = {
        admin: "/admin",
        doctor: "/doctor",
        nurse: "/nurse",
        receptionist: "/receptionist",
        patient: "/patient",
        lab: "/lab",
      };

      navigate(roleRoutes[userData.role] || "/login");
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage(error.message || "Login failed.");
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div style={loginPageStyles.container}>
      <div style={loginPageStyles.wrapper}>
        <div style={loginPageStyles.leftSection}></div>
        <div style={loginPageStyles.formSection}>
          <h2 style={loginPageStyles.title}>Care Giver</h2>
          <form onSubmit={handleLogin} style={loginPageStyles.form}>
            <div style={loginPageStyles.inputGroup}>
              <label style={loginPageStyles.label}>Select Hospital</label>
              <select
                style={loginPageStyles.input}
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                disabled={hospitalLoading}
              >
                <option value="">{hospitalLoading ? "Loading hospitals..." : "--Select a hospital--"}</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                ))}
              </select>
            </div>
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
            {errorMessage && (
              <div style={loginPageStyles.errorMessage}>
                <p>{errorMessage}</p>
              </div>
            )}
            <button type="submit" style={loginPageStyles.button} disabled={loginLoading || hospitalLoading}>
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const loginPageStyles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #6a11cb, #2575fc)" },
  wrapper: { display: "flex", width: "90%", height: "90%", maxWidth: "1100px", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", overflow: "hidden" },
  leftSection: { flex: 1 },
  formSection: { flex: 1, padding: "30px 40px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff", color: "#333" },
  title: { fontSize: "24px", marginBottom: "15px", color: "#333", textAlign: "center" },
  inputGroup: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  label: { marginBottom: "5px", fontWeight: "bold" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ddd" },
  button: { marginTop: "10px", padding: "10px", border: "none", borderRadius: "5px", color: "#fff", backgroundColor: "#2575fc", cursor: "pointer", transition: "background-color 0.3s ease" },
  errorMessage: { color: "red", fontSize: "14px", textAlign: "center", marginBottom: "10px" },
};

export default LoginPage;
