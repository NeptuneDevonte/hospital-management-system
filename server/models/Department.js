const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add department name'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a short description']
    },
    icon: {
        type: String // Filename or identifier for the department icon (e.g., 'dept-cardiology.svg')
    },
    headDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);