const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate, timeSlot, reasonForVisit } = req.body;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            appointmentDate,
            timeSlot,
            reasonForVisit
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Get all appointments for a user (Patient or Doctor view)
// @route   GET /api/appointments/:userId
// @access  Private
const getAppointmentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Find appointments where the user is either the patient or the doctor's linked user
        const appointments = await Appointment.find({
            $or: [{ patient: userId }]
        }).populate('patient', 'name email phone').populate({
            path: 'doctor',
            populate: { path: 'user', select: 'name email phone' }
        });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Update appointment status (Confirm, Cancel, Complete)
// @route   PUT /api/appointments/:id/status
// @access  Private
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status || appointment.status;
        const updatedAppointment = await appointment.save();

        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { createAppointment, getAppointmentsByUser, updateAppointmentStatus };