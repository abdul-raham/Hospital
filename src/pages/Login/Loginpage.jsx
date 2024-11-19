import React from 'react';
import Login from './Login';
import './LoginPage.css'; // Page-level styles

const LoginPage = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Welcome to Hospital Management System</h1>
        <p>Please login to continue</p>
      </header>
      <main className="login-main">
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;
