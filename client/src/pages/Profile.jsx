import React, { useState, useEffect } from 'react';
import { patientService } from '../services/api';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        dateOfBirth: '',
        gender: 'Male',
        bloodGroup: 'O+',
        address: '',
        emergencyName: '',
        emergencyPhone: '',
        emergencyRelation: '',
        allergies: '',
        medicalHistory: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo ? userInfo._id : null;

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) return;
            try {
                const data = await patientService.getProfile(userId);
                setProfile(data);
                setFormData({
                    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : '',
                    gender: data.gender || 'Male',
                    bloodGroup: data.bloodGroup || 'O+',
                    address: data.address || '',
                    emergencyName: data.emergencyContact?.name || '',
                    emergencyPhone: data.emergencyContact?.phone || '',
                    emergencyRelation: data.emergencyContact?.relation || '',
                    allergies: data.allergies ? data.allergies.join(', ') : '',
                    medicalHistory: data.medicalHistory ? data.medicalHistory.join(', ') : ''
                });
            } catch (err) {
                // Profile might not exist yet, which is fine
                console.log('No existing profile found, user can create one.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (!userId) {
            setMessage({ text: 'Please log in to update your profile.', type: 'error' });
            return;
        }

        try {
            const payload = {
                userId,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                bloodGroup: formData.bloodGroup,
                address: formData.address,
                emergencyContact: {
                    name: formData.emergencyName,
                    phone: formData.emergencyPhone,
                    relation: formData.emergencyRelation
                },
                allergies: formData.allergies.split(',').map(item => item.trim()).filter(Boolean),
                medicalHistory: formData.medicalHistory.split(',').map(item => item.trim()).filter(Boolean)
            };

            const updated = await patientService.upsertProfile(payload);
            setProfile(updated);
            setMessage({ text: 'Patient profile updated successfully!', type: 'success' });
        } catch (err) {
            setMessage({ text: err.message || 'Failed to save profile', type: 'error' });
        }
    };

    if (!userId) {
        return (
            <div className="profile-page">
                <div className="alert-warning">
                    Please <a href="/login">login</a> to view and manage your patient profile.
                </div>
            </div>
        );
    }

    if (loading) return <div className="loading-state">Loading profile...</div>;

    return (
        <div className="profile-page">
            <header className="page-header">
                <h1>Patient Health Profile</h1>
                <p>Manage your personal details, emergency contacts, and medical background.</p>
            </header>

            <div className="profile-card">
                {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}
                
                <div className="user-summary">
                    <h3>Account Info</h3>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Role:</strong> {userInfo.role}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <h2>Medical & Personal Details</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input 
                                type="date" 
                                name="dateOfBirth" 
                                value={formData.dateOfBirth} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Home Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            placeholder="Enter your address"
                            required 
                        />
                    </div>

                    <h3>Emergency Contact</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Contact Name</label>
                            <input 
                                type="text" 
                                name="emergencyName" 
                                value={formData.emergencyName} 
                                onChange={handleChange} 
                                placeholder="Emergency contact name" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Phone</label>
                            <input 
                                type="text" 
                                name="emergencyPhone" 
                                value={formData.emergencyPhone} 
                                onChange={handleChange} 
                                placeholder="Phone number" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Relation</label>
                            <input 
                                type="text" 
                                name="emergencyRelation" 
                                value={formData.emergencyRelation} 
                                onChange={handleChange} 
                                placeholder="e.g., Spouse, Parent" 
                            />
                        </div>
                    </div>

                    <h3>Medical Background</h3>
                    <div className="form-group">
                        <label>Allergies (comma separated)</label>
                        <input 
                            type="text" 
                            name="allergies" 
                            value={formData.allergies} 
                            onChange={handleChange} 
                            placeholder="e.g., Penicillin, Dust, Peanuts" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Medical History (comma separated)</label>
                        <input 
                            type="text" 
                            name="medicalHistory" 
                            value={formData.medicalHistory} 
                            onChange={handleChange} 
                            placeholder="e.g., Asthma, Hypertension, Diabetes" 
                        />
                    </div>

                    <button type="submit" className="btn-save">Save Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;