const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    industry: { type: String, required: true },
    experience: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    linkedin: { type: String, required: true },
    resume: { type: String, required: true },
    jobFunction: { type: String, required: true },
    bio: { type: String, required: true },
    workSample: { type: String, required: true },
    approval: { type: Boolean, default: false }
});

module.exports = mongoose.model('Creator', creatorSchema);
