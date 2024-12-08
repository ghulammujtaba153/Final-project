import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema({
    profile: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        set: (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        set: (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Male',
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'patient', 'nurse', "driver"],
        default: 'patient'
    },
    dateOfBirth: {
        type: Date,
    },
    contactNumber: {
        type: String,
        trim: true
    },
    postalAddress: {
        type: String,
        trim: true
    },
    permanentAddress: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
export default User;
