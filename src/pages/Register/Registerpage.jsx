import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

const registerPageStyles = {
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

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [roles, setRoles] = useState(["admin", "doctor", "nurse", "receptionist", "patient", "lab"]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const snapshot = await getDocs(collection(db, "hospitals"));
        const hospitalList = snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }));
        setHospitals(hospitalList);
      } catch (error) {
        console.error("Error fetching hospitals: ", error);
      }
    };
    fetchHospitals();
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedHospital || !selectedRole) {
      setError("Please select a hospital and role.");
      return;
    }
    try {
      await setDoc(doc(db, "hospitals", selectedHospital, "users", email), {
        email,
        password,
        hospitalId: selectedHospital,
        role: selectedRole,
      });
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error: ", error);
      setError("Registration failed.");
    }
  };
  

  return (
    <div style={registerPageStyles.container}>
      <div style={registerPageStyles.wrapper}>
        <div style={registerPageStyles.leftSection}></div>
        <div style={registerPageStyles.formSection}>
          <h2 style={registerPageStyles.title}>Register</h2>
          {error && <p style={registerPageStyles.errorMessage}>{error}</p>}
          <form onSubmit={handleRegister}>
            <div style={registerPageStyles.inputGroup}>
              <label style={registerPageStyles.label}>Select Hospital</label>
              <select style={registerPageStyles.input} value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)} required>
                <option value="">--Select a hospital--</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                ))}
              </select>
            </div>
            <div style={registerPageStyles.inputGroup}>
              <label style={registerPageStyles.label}>Select Role</label>
              <select style={registerPageStyles.input} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                <option value="">--Select a role--</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div style={registerPageStyles.inputGroup}>
              <label style={registerPageStyles.label}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={registerPageStyles.input} placeholder="Enter your email" required />
            </div>
            <div style={registerPageStyles.inputGroup}>
              <label style={registerPageStyles.label}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={registerPageStyles.input} placeholder="Enter your password" required />
            </div>
            <button type="submit" style={registerPageStyles.button}>Register</button>
          </form>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
