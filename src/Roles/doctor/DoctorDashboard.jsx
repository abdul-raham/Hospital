import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import '../doctor/DoctorDashboard.css'; // Dashboard styling

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]); // State to hold appointments
  const [patients, setPatients] = useState([]); // State to hold patient records
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const appointmentsSnapshot = await getDocs(collection(db, 'appointments')); // Get appointments collection
        const appointmentsData = appointmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // Map Firestore document data
        }));
        setAppointments(appointmentsData); // Set appointments state
      } catch (error) {
        console.error('Error fetching appointments:', error); // Log errors
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    const fetchPatients = async () => {
      try {
        const patientsSnapshot = await getDocs(collection(db, 'patients')); // Get patients collection
        const patientsData = patientsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // Map Firestore document data
        }));
        setPatients(patientsData); // Set patients state
      } catch (error) {
        console.error('Error fetching patients:', error); // Log errors
      }
    };

    fetchAppointments();
    fetchPatients();
  }, []); // Empty dependency array ensures it runs once on mount

  // Render loading indicator if fetching data
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="doctor-dashboard">
      <h1>Doctor Dashboard</h1>

      {/* Section: Appointments */}
      <section className="appointments-section">
        <h2>Appointments</h2>
        {appointments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appt => (
                <tr key={appt.id}>
                  <td>{appt.patientName}</td>
                  <td>{appt.time}</td>
                  <td>{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No upcoming appointments.</p> // Show if no data
        )}
      </section>

      {/* Section: Patient Records */}
      <section className="patients-section">
        <h2>Patient Records</h2>
        {patients.length > 0 ? (
          <ul className="patient-list">
            {patients.map(patient => (
              <li key={patient.id}>
                <strong>{patient.name}</strong> - {patient.condition}
              </li>
            ))}
          </ul>
        ) : (
          <p>No patient records available.</p> // Show if no data
        )}
      </section>
    </div>
  );
};

export default DoctorDashboard;
