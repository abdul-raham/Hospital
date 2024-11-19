import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    // Login logic here
    console.log("Login submitted");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Hospital Portal</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;