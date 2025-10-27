const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,

    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'Gender must be one of: male, female, other.',
        },
        lowercase: true,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    address: {
        street: String,
        city: String,
        country: { type: String, default: 'Morocco' },

    },
    phone: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (E.164 format).'], // Basic phone validation (international format)
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },




}, { timestamps: true })
module.exports = mongoose.model("User", userSchema);