const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, createDoctorProfile } = require('../controllers/doctorController');

router.route('/').get(getDoctors).post(createDoctorProfile);
router.route('/:id').get(getDoctorById);

module.exports = router;