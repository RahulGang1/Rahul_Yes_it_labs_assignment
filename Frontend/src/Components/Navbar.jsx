import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>My App</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/register" className="navbar-link">Register</Link>
        </li>
        <li>
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
        <li>
          <Link to="/users" className="navbar-link">User List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
