const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name can be at most 50 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email']
    },
    number: {
        type: String,
        trim: true,
        match: [/^\d{10}$/, 'Number must be 10 digits'],
        unique: true,
        sparse: true
    },

    // For normal login
    password: {
        type: String,
        select: false,
        trim: true,
        minlength: [6, 'Password must be at least 6 characters']
    },  // will be null for Google users

    // For Google login
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: { type: String }, // Google profile picture

    // Common fields
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
