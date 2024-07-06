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
    assignedCreator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Creator' 
    },
    projectLink: {
        type: String
    },
    assigned: {
        type: Boolean,
        default: false
    },
    review: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
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
