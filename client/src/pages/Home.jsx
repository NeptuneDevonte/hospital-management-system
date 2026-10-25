import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Optional: for custom styling if needed

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url('/src/assets/images/hero-banner.jpg')` }}>
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
                <img src="/src/assets/images/banner-emergency.jpg" alt="Emergency Care" className="emergency-img" />
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
                        <img src="/src/assets/images/dept-cardiology.svg" alt="Cardiology" />
                        <h3>Cardiology</h3>
                        <p>Advanced heart care and cardiovascular diagnostics.</p>
                    </div>
                    <div className="dept-card">
                        <img src="/src/assets/images/dept-neurology.svg" alt="Neurology" />
                        <h3>Neurology</h3>
                        <p>Specialized treatment for brain, spine, and nervous system disorders.</p>
                    </div>
                    <div className="dept-card">
                        <img src="/src/assets/images/dept-pediatrics.svg" alt="Pediatrics" />
                        <h3>Pediatrics</h3>
                        <p>Comprehensive healthcare for infants, children, and adolescents.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;