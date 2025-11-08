const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Student = require('./models/Student');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // to be able to access your req.body
app.use(express.urlencoded({ extended: true })); // to be able to access form data
app.use(express.static(path.join(__dirname, 'public'))); // to serve/host static files

// Connect to MongoDB
const mongoDB_URI = 'mongodb://localhost:27017/student-manager'; // access the database
mongoose.connect(mongoDB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
// create a new student
app.post('/api/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        console.error(`Error creating student: ${err.message}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get all the students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get student by ID
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return req.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        console.error(`Error fetching student with ID: ${req.params.id}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Find Student by ID
app.put('/api/students/:id', async (req, res) => {
    try {
        const student = await student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);

    } catch {
        console.error(`Error updating student with ID: ${req.params.id}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete student by ID
app.delete('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(`Error deleting student with ID: ${req.params.id}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// start the server on a port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})



