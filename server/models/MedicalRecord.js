const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
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
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    diagnosis: {
        type: String,
        required: [true, 'Please add a diagnosis']
    },
    prescriptions: [{
        medicineName: String,
        dosage: String,
        duration: String,
        instructions: String
    }],
    additionalNotes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);