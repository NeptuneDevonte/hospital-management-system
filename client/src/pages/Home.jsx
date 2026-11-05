import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Import images so Vite bundles them correctly for both local and production builds
import heroBanner from '../assets/images/hero-banner.jpg';
import emergencyBanner from '../assets/images/banner-emergency.jpg';
import deptCardiology from '../assets/images/dept-cardiology.svg';
import deptNeurology from '../assets/images/dept-neurology.svg';
import deptPediatrics from '../assets/images/dept-pediatrics.svg';

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url(${heroBanner})` }}>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Welcome to City Hospital Management System</h1>
                        <p>Providing compassionate care, advanced medical technology, and expert doctors you can trust.</p>
                        <div className="hero-buttons">
                            <Link to="/appointments" className="btn btn-primary">Book Appointment</Link>
                            <Link to="/doctors" className="btn btn-secondary">Find a Doctor</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Banner Section */}
            <section className="emergency-banner">
                <img src={emergencyBanner} alt="Emergency Care" className="emergency-img" />
                <div className="emergency-text">
                    <h3>24/7 Emergency Medical Services</h3>
                    <p>Call us immediately or visit our emergency ward for urgent medical assistance.</p>
                </div>
            </section>

            {/* Departments Preview Section */}
            <section className="departments-preview">
                <h2>Our Specialized Departments</h2>
                <div className="dept-grid">
                    <div className="dept-card">
                        <img src={deptCardiology} alt="Cardiology" />
                        <h3>Cardiology</h3>
                        <p>Advanced heart care and cardiovascular diagnostics.</p>
                    </div>
                    <div className="dept-card">
                        <img src={deptNeurology} alt="Neurology" />
                        <h3>Neurology</h3>
                        <p>Specialized treatment for brain, spine, and nervous system disorders.</p>
                    </div>
                    <div className="dept-card">
                        <img src={deptPediatrics} alt="Pediatrics" />
                        <h3>Pediatrics</h3>
                        <p>Comprehensive healthcare for infants, children, and adolescents.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;