import React from "react";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <div className="header">
      <h1>{title}</h1>
      <p>Welcome, Admin!</p>
    </div>
  );
};

export default Header;
