const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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
    paymentId: {
        type: String
    },
    paymentDone: {
        type: Boolean,
        default: false
    },
    crePayDetails: {
        type: Boolean,
        default: false
    },
    CrePaymentDone: {
        type: Boolean,
        default: false
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
    },
    projectFeedback: {
        admin: {
            feedback: {
                type: String,
                default: ''
            },
            rating: {
                type: Number,
                default: 0
            }
        },
        business: {
            feedback: {
                type: String,
                default: ''
            },
            rating: {
                type: Number,
                default: 0
            }
        }
    },
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
