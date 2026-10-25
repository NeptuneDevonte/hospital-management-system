const Billing = require('../models/Billing');

// @desc    Create a new bill / invoice
// @route   POST /api/billing
// @access  Private (Admin / Receptionist)
const createBill = async (req, res) => {
    try {
        const { patientId, appointmentId, totalAmount, paymentMethod, itemizedServices } = req.body;

        const bill = await Billing.create({
            patient: patientId,
            appointment: appointmentId,
            totalAmount,
            paymentMethod,
            itemizedServices
        });

        res.status(201).json(bill);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Get bills for a specific patient
// @route   GET /api/billing/patient/:patientId
// @access  Private
const getPatientBills = async (req, res) => {
    try {
        const { patientId } = req.params;

        const bills = await Billing.find({ patient: patientId })
            .populate('patient', 'name email phone')
            .populate('appointment');

        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Update payment status (e.g., from Pending to Paid)
// @route   PUT /api/billing/:id/pay
// @access  Private
const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const bill = await Billing.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        bill.paymentStatus = paymentStatus || bill.paymentStatus;
        const updatedBill = await bill.save();

        res.json(updatedBill);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { createBill, getPatientBills, updatePaymentStatus };