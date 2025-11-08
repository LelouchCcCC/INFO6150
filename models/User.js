const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// SCHEMA
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    imagePath: {
        type: String,
        required: false,
        default: null
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err); 
    }
});


// CREATE MODEL
const User = mongoose.model('User', userSchema)

// EXPORT MODEL
module.exports = User;