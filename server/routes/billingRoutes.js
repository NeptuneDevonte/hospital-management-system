const express = require('express');
const router = express.Router();
const { 
    createBill, 
    getPatientBills, 
    updatePaymentStatus 
} = require('../controllers/billingController');

router.route('/').post(createBill);
router.route('/patient/:patientId').get(getPatientBills);
router.route('/:id/pay').put(updatePaymentStatus);

module.exports = router;