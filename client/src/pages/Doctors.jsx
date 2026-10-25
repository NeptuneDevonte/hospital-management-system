import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorService, departmentService } from '../services/api';
import '../styles/Doctors.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [docData, deptData] = await Promise.all([
                    doctorService.getAllDoctors(),
                    departmentService.getAllDepartments()
                ]);
                setDoctors(docData);
                setDepartments(deptData);
            } catch (err) {
                setError('Failed to load doctors and departments.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="loading-state">Loading doctors and departments...</div>;
    if (error) return <div className="error-state">{error}</div>;

    return (
        <div className="doctors-page">
            <header className="page-header">
                <h1>Our Medical Specialists & Departments</h1>
                <p>Meet our experienced doctors and explore our specialized hospital departments.</p>
            </header>

            {/* Departments Section */}
            <section className="departments-section">
                <h2>Hospital Departments</h2>
                <div className="departments-grid">
                    {departments.length === 0 ? (
                        <p>No departments added yet.</p>
                    ) : (
                        departments.map((dept) => (
                            <div key={dept._id} className="department-card">
                                <h3>{dept.name}</h3>
                                <p>{dept.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Doctors Section */}
            <section className="doctors-section">
                <h2>Available Doctors</h2>
                <div className="doctors-grid">
                    {doctors.length === 0 ? (
                        <p>No doctor profiles created yet. Add a doctor profile via the backend API to see them here.</p>
                    ) : (
                        doctors.map((doc) => (
                            <div key={doc._id} className="doctor-card">
                                <img src="/src/assets/images/doctor-placeholder-1.jpg" alt="Doctor" className="doctor-avatar" />
                                <h3>{doc.user?.name || 'Dr. Specialist'}</h3>
                                <p className="specialization">{doc.specialization}</p>
                                <p className="qualification"><strong>Qualifications:</strong> {doc.qualification}</p>
                                <p><strong>Experience:</strong> {doc.experienceYears} Years</p>
                                <p className="fee"><strong>Fee:</strong> ${doc.consultationFee}</p>
                                <p className="slots"><strong>Days:</strong> {doc.availableDays.join(', ')}</p>
                                <Link to={`/appointments`} className="btn-book">Book Appointment</Link>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Doctors;