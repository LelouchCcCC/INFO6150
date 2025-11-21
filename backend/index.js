import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import User from './models/User.js';
import Job from './models/Job.js';
import multer from 'multer';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { body, validationResult } from 'express-validator'; 

const app = express();
const PORT = 3000;

// Connect to MongoDB
const mongoDB_URI = 'mongodb://localhost:27017/a8'; 

mongoose.connect(mongoDB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


// --- 1. CORS  ---
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
// --- 2. Session---
app.use(cookieParser());
app.use(session({
    secret: 'jobportal_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24 
    }
}));


// --- 3. Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


// Image setup 
const imageDir = path.join(__dirname, 'images');
(async () => {
    try {
        await fs.mkdir(imageDir, { recursive: true });
    } catch (err) {
        console.error("Could not create images directory:", err);
    }
})();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, imageDir); },
    filename: (req, file, cb) => {
        const email = req.body.email.replace(/[^a-zA-Z0-9]/g, '_');
        const fileExtension = path.extname(file.originalname);
        cb(null, `${email}-${Date.now()}${fileExtension}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } 
});


// 1. User Creation: POST /user/create 
app.post('/user/create', [
    body('fullName').matches(/^[a-zA-Z\s]+$/).withMessage('Full Name must contain only alphabetic characters'),
    body('email').isEmail().withMessage('Email must be a valid format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be minimum 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/).withMessage('Password must include strong requirements'),
    body('type').isIn(['admin', 'employee']).withMessage('Type must be admin or employee')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ error: "Validation failed.", details: errors.array() }); }
    try {
        const { fullName, email, password, type } = req.body;
        const user = new User({ fullName, email, password, type });
        await user.save();
        res.status(201).json({ message: "User created successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating user" });
    }
});

// 2. Update User Details: PUT /user/edit 
app.put('/user/edit', [
    body('fullName').optional().matches(/^[a-zA-Z\s]+$/).withMessage('Full Name must contain only alphabetic characters'),
    body('password').optional().isLength({ min: 8 }).withMessage('Password must be minimum 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/).withMessage('Password must include strong requirements')
], async (req, res) => {
    const { email, fullName, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ error: "Validation failed.", details: errors.array() }); }
    if (!email) { return res.status(400).json({ error: "Validation failed.", details: [{ msg: "Email is required for updating." }] }); }
    try {
        let user = await User.findOne({ email });
        if (!user) { return res.status(404).json({ error: "User not found." }); }
        if (fullName) { user.fullName = fullName; }
        if (password) { user.password = password; } 
        await user.save();
        res.status(200).json({ message: "User updated successfully." });
    } catch (err) {
        console.error(`Error updating user: ${err.message}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 3. Delete User: DELETE /user/delete 
app.delete('/user/delete', async (req, res) => {
    const { email } = req.body;
    if (!email) { return res.status(400).json({ error: "Validation failed.", details: [{ msg: "Email is required for deletion." }] }); }
    try {
        const result = await User.deleteOne({ email });
        if (result.deletedCount === 0) { return res.status(404).json({ error: "User not found." }); }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        console.error(`Error deleting user with email: ${email}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 4. Retrieve All Users: GET /user/getAll
app.get('/user/getAll', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// 5. User Authentication (Login) - POST /user/authenticate
app.post('/user/authenticate', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials." });
        req.session.user = { id: user._id, email: user.email, type: user.type };
        res.status(200).json({ 
            message: "Login successful", 
            email: user.email, 
            fullName: user.fullName, 
            type: user.type 
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// 6. Image Upload: POST /user/uploadImage
app.post('/user/uploadImage', (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) { return res.status(400).json({ error: "Upload failed.", details: err.message }); } 
        else if (err) {
            if (err.message.includes('Invalid file format')) { return res.status(400).json({ error: err.message }); }
            console.error('Multer/FileFilter Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const { email } = req.body;
        if (!email) {
            if (req.file) await fs.unlink(req.file.path);
            return res.status(400).json({ error: "Email is required in the form data." });
        }
        if (!req.file) { return res.status(400).json({ error: "Image file is required." }); }

        try {
            let user = await User.findOne({ email });
            if (!user) {
                await fs.unlink(req.file.path);
                return res.status(404).json({ error: "User not found." });
            }
            if (user.imagePath) {
                await fs.unlink(req.file.path);
                return res.status(400).json({ error: "Image already exists for this user. Deletion required before re-upload." });
            }
            const filePath = `/images/${path.basename(req.file.path)}`;
            user.imagePath = filePath;
            await user.save();

            res.status(201).json({ message: "Image uploaded successfully and path saved.", email: user.email, filePath: filePath });

        } catch (dbErr) {
            if (req.file) { try { await fs.unlink(req.file.path); } catch (e) { /* ignore */ } }
            console.error('Database Error during upload:', dbErr);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// 7. Session Logout - POST /user/logout 
app.post('/user/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) { return res.status(500).json({ error: 'Could not log out, please try again.' }); }
        res.clearCookie('connect.sid'); 
        res.status(200).json({ message: 'Logout successful.' });
    });
});

// 8. 获取所有公司图片路径 - GET /api/images/getAll
app.get('/api/images/getAll', async (req, res) => {
    try {
        const usersWithImages = await User.find({ imagePath: { $ne: null } }, 'fullName imagePath');

        const companyImages = usersWithImages.map(user => ({
            name: user.fullName,
            imagePath: user.imagePath 
        }));

        res.status(200).json(companyImages);
    } catch (err) {
        console.error('Error fetching company images:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 9. add job
app.post('/api/create/job', async (req, res) => {
    // 可以在这里加个校验：if (req.session.user.type !== 'admin') return 403;
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ error: "Error creating job" });
    }
});

// 10. get all jobs
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Error fetching jobs" });
    }
});

// serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// start the server on a port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});