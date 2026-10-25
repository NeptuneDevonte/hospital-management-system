const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Please add an appointment date']
    },
    timeSlot: {
        type: String,
        required: [true, 'Please specify a time slot']
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    reasonForVisit: {
        type: String,
        required: [true, 'Please provide a reason for visit']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);