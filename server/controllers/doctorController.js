const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).populate('user', 'name email phone');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('user', 'name email phone');
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Create doctor profile (Admin or Doctor)
// @route   POST /api/doctors
// @access  Private
const createDoctorProfile = async (req, res) => {
    try {
        const { userId, specialization, qualification, experienceYears, consultationFee, availableDays, availableTimeSlot } = req.body;

        const user = await User.findById(userId);
        if (!user || user.role !== 'doctor') {
            return res.status(400).json({ message: 'Invalid user or user is not assigned the doctor role' });
        }

        const doctorExists = await Doctor.findOne({ user: userId });
        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor profile already exists for this user' });
        }

        const doctor = await Doctor.create({
            user: userId,
            specialization,
            qualification,
            experienceYears,
            consultationFee,
            availableDays,
            availableTimeSlot
        });

        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { getDoctors, getDoctorById, createDoctorProfile };