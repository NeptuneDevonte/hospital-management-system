import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src="/src/assets/images/logo.svg" alt="Hospital Logo" className="navbar-logo" />
                    <span>City Hospital</span>
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/doctors">Doctors & Departments</Link></li>
                <li><Link to="/appointments">Book Appointment</Link></li>
                <li><Link to="/login" className="nav-login-btn">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;