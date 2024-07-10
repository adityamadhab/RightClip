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
    requirements: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    projectCategory: {
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
    creatorApproval: {
        type: Boolean,
        default: false
    },
    businessApproval: {
        type: Boolean,
        default: false
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
    cancelled: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
