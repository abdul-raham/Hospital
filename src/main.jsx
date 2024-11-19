// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client'; // In Vite, React 18+ uses this to create the root
import App from './App';  // Make sure to import your main component
import './index.css';  // Optional: If you're using a global stylesheet
import { AuthProvider } from './context/AuthContext';
// Create the root and render the app inside it
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside StrictMode (for development warnings)
root.render(
  <React.StrictMode>
    <AuthProvider> {/* If using context, wrap the app with AuthProvider or any other context */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
