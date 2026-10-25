const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: [true, 'Please add a specialization (e.g., Cardiology, Neurology)']
    },
    qualification: {
        type: String,
        required: [true, 'Please add qualifications (e.g., MBBS, FCPS)']
    },
    experienceYears: {
        type: Number,
        required: [true, 'Please add years of experience']
    },
    consultationFee: {
        type: Number,
        required: [true, 'Please add consultation fee']
    },
    availableDays: {
        type: [String],
        required: true // e.g., ['Monday', 'Wednesday', 'Friday']
    },
    availableTimeSlot: {
        type: String,
        required: true // e.g., '10:00 AM - 02:00 PM'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);