import React, { useState, useEffect } from 'react';
import { doctorService, appointmentService } from '../services/api';
import '../styles/Appointments.css';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [userAppointments, setUserAppointments] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: '',
        appointmentDate: '',
        timeSlot: '',
        reasonForVisit: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Retrieve logged-in user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const patientId = userInfo ? userInfo._id : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docData = await doctorService.getAllDoctors();
                setDoctors(docData);

                if (patientId) {
                    const apptData = await appointmentService.getUserAppointments(patientId);
                    setUserAppointments(apptData);
                }
            } catch (err) {
                console.error('Error fetching appointment data:', err);
            }
        };
        fetchData();
    }, [patientId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (!patientId) {
            setMessage({ text: 'Please login as a patient to book an appointment.', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const payload = {
                patientId,
                doctorId: formData.doctorId,
                appointmentDate: formData.appointmentDate,
                timeSlot: formData.timeSlot,
                reasonForVisit: formData.reasonForVisit
            };

            await appointmentService.createAppointment(payload);
            setMessage({ text: 'Appointment booked successfully!', type: 'success' });
            
            // Refresh appointment list
            const updatedAppts = await appointmentService.getUserAppointments(patientId);
            setUserAppointments(updatedAppts);

            // Reset form
            setFormData({ doctorId: '', appointmentDate: '', timeSlot: '', reasonForVisit: '' });
        } catch (err) {
            setMessage({ text: err.message || 'Failed to book appointment', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="appointments-page">
            <header className="page-header">
                <h1>Appointment Management</h1>
                <p>Book consultations with our expert doctors and view your appointment history.</p>
            </header>

            {!patientId && (
                <div className="alert-warning">
                    Note: You are currently not logged in. Please <a href="/login">login</a> to book and track your appointments.
                </div>
            )}

            <div className="appointments-content">
                {/* Booking Form */}
                <div className="booking-card">
                    <h2>Book a New Appointment</h2>
                    {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Select Doctor</label>
                            <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                                <option value="">-- Choose a Doctor --</option>
                                {doctors.map((doc) => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.user?.name || 'Doctor'} ({doc.specialization}) - ${doc.consultationFee}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Appointment Date</label>
                            <input 
                                type="date" 
                                name="appointmentDate" 
                                value={formData.appointmentDate} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Time Slot</label>
                            <input 
                                type="text" 
                                name="timeSlot" 
                                value={formData.timeSlot} 
                                onChange={handleChange} 
                                placeholder="e.g., 10:00 AM - 10:30 AM" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Reason for Visit</label>
                            <textarea 
                                name="reasonForVisit" 
                                value={formData.reasonForVisit} 
                                onChange={handleChange} 
                                placeholder="Briefly describe your symptoms or reason for visit" 
                                rows="3"
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Booking...' : 'Confirm Appointment'}
                        </button>
                    </form>
                </div>

                {/* User Appointments History */}
                {patientId && (
                    <div className="appointments-list-card">
                        <h2>Your Appointments</h2>
                        {userAppointments.length === 0 ? (
                            <p>No appointments booked yet.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="appointments-table">
                                    <thead>
                                        <tr>
                                            <th>Doctor</th>
                                            <th>Date</th>
                                            <th>Time Slot</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userAppointments.map((appt) => (
                                            <tr key={appt._id}>
                                                <td>{appt.doctor?.user?.name || 'Specialist'} ({appt.doctor?.specialization})</td>
                                                <td>{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                                                <td>{appt.timeSlot}</td>
                                                <td>
                                                    <span className={`status-badge ${appt.status.toLowerCase()}`}>
                                                        {appt.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;