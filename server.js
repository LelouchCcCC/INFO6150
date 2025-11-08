const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const multer = require('multer');
const fs = require('fs/promises');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // to be able to access your req.body
app.use(express.urlencoded({ extended: true })); // to be able to access form data
app.use(express.static(path.join(__dirname, 'public'))); // to serve/host static files

// Connect to MongoDB
const mongoDB_URI = 'mongodb://localhost:27017/a8'; // access the database
const { body, validationResult } = require('express-validator');
mongoose.connect(mongoDB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


// image
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
    destination: (req, file, cb) => {
        cb(null, imageDir); // save to /images directory
    },
    filename: (req, file, cb) => {
        const email = req.body.email.replace(/[^a-zA-Z0-9]/g, '_');
        const fileExtension = path.extname(file.originalname);
        cb(null, `${email}-${Date.now()}${fileExtension}`);
    }
});

// file filter
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
    limits: { 
        fileSize: 1024 * 1024 * 5 // 5MB MAX
    }
});

// Routes
// 1. User Creation: POST /user/create (Success: 201, Error: 400)
app.post('/user/create', [
    body('fullName')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full Name must contain only alphabetic characters'),
    body('email')
        .isEmail()
        .withMessage('Email must be a valid format'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be minimum 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/)
        .withMessage('Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Validation failed.", details: errors.array() });
    }

    try {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save();
        res.status(201).json({ message: "User created successfully." });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Validation failed.", details: [{ msg: "Email already exists" }] });
        }
        console.error(`Error creating user: ${err.message}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// 2. Update User Details: PUT /user/edit (Success: 200, Error: 400/404)
app.put('/user/edit', [
    body('fullName')
        .optional()
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full Name must contain only alphabetic characters'),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password must be minimum 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/)
        .withMessage('Password must include strong requirements')
], async (req, res) => {
    const { email, fullName, password } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Validation failed.", details: errors.array() });
    }

    if (!email) {
        return res.status(400).json({ error: "Validation failed.", details: [{ msg: "Email is required for updating." }] });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (fullName) {
            user.fullName = fullName;
        }
        if (password) {
            user.password = password; 
        }

        await user.save();

        res.status(200).json({ message: "User updated successfully." });
    } catch (err) {
        console.error(`Error updating user: ${err.message}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 3. Delete User: DELETE /user/delete (Success: 200, Error: 404)
app.delete('/user/delete', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: "Validation failed.", details: [{ msg: "Email is required for deletion." }] });
    }

    try {
        const result = await User.deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found." });
        }
        
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        console.error(`Error deleting user with email: ${email}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 4. Retrieve All Users: GET /user/getAll (Success: 200)
app.get('/user/getAll', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email password');
        
        const formattedUsers = users.map(user => ({
            fullName: user.fullName,
            email: user.email,
            password: user.password
        }));
        
        res.status(200).json({ users: formattedUsers });
    } catch (err) {
        console.error('Error fetching all users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 5. User Authentication (Login) - POST /user/authenticate (Success: 200, Error: 401/404)
app.post('/user/authenticate', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required for authentication." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        res.status(200).json({ message: "Authentication successful.", email: user.email, fullName: user.fullName });
        
    } catch (err) {
        console.error(`Error during authentication: ${err.message}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 6. Image Upload: POST /user/uploadImage (Success: 201, Error: 400)
app.post('/user/uploadImage', (req, res) => {
    upload.single('image')(req, res, async function (err) {
        
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: "Upload failed.", details: err.message });
        } else if (err) {
            if (err.message === 'Invalid file format. Only JPEG, PNG, and GIF are allowed.') {
                return res.status(400).json({ error: err.message });
            }
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const { email } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required." });
        }

        try {
            let user = await User.findOne({ email });
            
            res.status(201).json({ 
                message: "Image uploaded successfully.", 
            });

        } catch (dbErr) {
        }
    });
});

// serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// start the server on a port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})



