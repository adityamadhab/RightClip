const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    preferences: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    creatorCategory: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
