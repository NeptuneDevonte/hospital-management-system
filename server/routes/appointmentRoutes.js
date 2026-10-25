const express = require('express');
const router = express.Router();
const { 
    createAppointment, 
    getAppointmentsByUser, 
    updateAppointmentStatus 
} = require('../controllers/appointmentController');

router.route('/').post(createAppointment);
router.route('/user/:userId').get(getAppointmentsByUser);
router.route('/:id/status').put(updateAppointmentStatus);

module.exports = router;