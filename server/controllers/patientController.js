const PatientProfile = require('../models/PatientProfile');

// @desc    Get patient profile by user ID
// @route   GET /api/patients/:userId
// @access  Private
const getPatientProfile = async (req, res) => {
    try {
        const profile = await PatientProfile.findOne({ user: req.params.userId }).populate('user', 'name email phone');
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ message: 'Patient profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Create or update patient profile
// @route   POST /api/patients
// @access  Private
const upsertPatientProfile = async (req, res) => {
    try {
        const { userId, dateOfBirth, gender, bloodGroup, address, emergencyContact, allergies, medicalHistory } = req.body;

        const profileFields = {
            user: userId,
            dateOfBirth,
            gender,
            bloodGroup,
            address,
            emergencyContact,
            allergies,
            medicalHistory
        };

        let profile = await PatientProfile.findOne({ user: userId });

        if (profile) {
            // Update
            profile = await PatientProfile.findOneAndUpdate(
                { user: userId },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = await PatientProfile.create(profileFields);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { getPatientProfile, upsertPatientProfile };