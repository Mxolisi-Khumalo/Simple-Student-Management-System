const router = require('express').Router();
const Student = require('../models/Student');

// create student
router.post('/', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// read students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 }); 
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update student
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true } ); // return updated document
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// remove student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;