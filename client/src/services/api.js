import axios from 'axios';

// Base URL configuration for your Node.js backend server
const API = axios.create({
    baseURL: import.meta.env.PROD 
        ? 'https://hospital-management-system-23in.onrender.com/api' 
        : 'http://localhost:5000/api',
});

// Generic helper function for API requests using Axios
const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await API({
            url: endpoint,
            method,
            headers,
            data: data ? data : undefined,
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
    }
};

// Authentication API calls
export const authService = {
    register: (userData) => apiRequest('/auth/register', 'POST', userData),
    login: (credentials) => apiRequest('/auth/login', 'POST', credentials),
};

// Doctor API calls
export const doctorService = {
    getAllDoctors: () => apiRequest('/doctors', 'GET'),
    getDoctorById: (id) => apiRequest(`/doctors/${id}`, 'GET'),
    createDoctor: (doctorData) => apiRequest('/doctors', 'POST', doctorData),
};

// Appointment API calls
export const appointmentService = {
    createAppointment: (appointmentData) => apiRequest('/appointments', 'POST', appointmentData),
    getUserAppointments: (userId) => apiRequest(`/appointments/user/${userId}`, 'GET'),
    updateStatus: (id, status) => apiRequest(`/appointments/${id}/status`, 'PUT', { status }),
};

// Department API calls
export const departmentService = {
    getAllDepartments: () => apiRequest('/departments', 'GET'),
};

// Patient Profile API calls
export const patientService = {
    getProfile: (userId) => apiRequest(`/patients/${userId}`, 'GET'),
    upsertProfile: (profileData) => apiRequest('/patients', 'POST', profileData),
};