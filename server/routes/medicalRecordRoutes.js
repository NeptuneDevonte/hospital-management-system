const express = require('express');
const router = express.Router();
const { 
    createMedicalRecord, 
    getPatientRecords 
} = require('../controllers/medicalRecordController');

router.route('/').post(createMedicalRecord);
router.route('/patient/:patientId').get(getPatientRecords);

module.exports = router;