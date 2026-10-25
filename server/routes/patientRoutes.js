const express = require('express');
const router = express.Router();
const { getPatientProfile, upsertPatientProfile } = require('../controllers/patientController');

router.route('/').post(upsertPatientProfile);
router.route('/:userId').get(getPatientProfile);

module.exports = router;