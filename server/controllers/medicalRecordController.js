const MedicalRecord = require('../models/MedicalRecord');

// @desc    Create a new medical record / prescription
// @route   POST /api/records
// @access  Private (Doctor)
const createMedicalRecord = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentId, diagnosis, prescriptions, additionalNotes } = req.body;

        const record = await MedicalRecord.create({
            patient: patientId,
            doctor: doctorId,
            appointment: appointmentId,
            diagnosis,
            prescriptions,
            additionalNotes
        });

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Get medical records for a specific patient
// @route   GET /api/records/patient/:patientId
// @access  Private
const getPatientRecords = async (req, res) => {
    try {
        const { patientId } = req.params;

        const records = await MedicalRecord.find({ patient: patientId })
            .populate('patient', 'name email phone')
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name email phone' }
            });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { createMedicalRecord, getPatientRecords };