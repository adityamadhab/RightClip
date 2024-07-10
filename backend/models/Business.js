const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    noemployee: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: { type: String },
    otpExpiration: { type: Date }
});

const businessModel = mongoose.model("Business", businessSchema);

module.exports = businessModel;