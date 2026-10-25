const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const billingRoutes = require('./routes/billingRoutes');
const departmentRoutes = require('./routes/departmentRoutes')
const patientRoutes = require('./routes/patientRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/records', medicalRecordRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/patients', patientRoutes);

app.get('/', (req, res) => {
    res.json({ message: "City Hospital Management System API is live and operational." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});