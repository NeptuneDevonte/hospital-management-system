const Department = require('../models/Department');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find({}).populate({
            path: 'headDoctor',
            populate: { path: 'user', select: 'name email phone' }
        });
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private (Admin)
const createDepartment = async (req, res) => {
    try {
        const { name, description, icon, headDoctor } = req.body;

        const deptExists = await Department.findOne({ name });
        if (deptExists) {
            return res.status(400).json({ message: 'Department already exists' });
        }

        const department = await Department.create({
            name,
            description,
            icon,
            headDoctor
        });

        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { getDepartments, createDepartment };