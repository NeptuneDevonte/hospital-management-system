// Base URL for your Node.js backend server
const API_BASE_URL = 'http://localhost:5000/api';

// Generic helper function for API requests
const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
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