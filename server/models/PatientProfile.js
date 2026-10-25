const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please add date of birth']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    emergencyContact: {
        name: String,
        phone: String,
        relation: String
    },
    allergies: {
        type: [String]
    },
    medicalHistory: {
        type: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PatientProfile', patientProfileSchema);