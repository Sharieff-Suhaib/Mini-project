import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    navigate('/home');
  }
  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  }
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Social Media</h2>
      <ul className="navbar-links">
        <li onClick={handleHome}>Home</li>
        <li>Messages</li>
        <li onClick={handleProfile}>Profile</li>
      </ul>
    </nav>
  );
}

export default Navbar;
