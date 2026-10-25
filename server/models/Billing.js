const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    totalAmount: {
        type: Number,
        required: [true, 'Please add total amount']
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Insurance', 'Online'],
        default: 'Cash'
    },
    itemizedServices: [{
        serviceName: String,
        cost: Number
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Billing', billingSchema);