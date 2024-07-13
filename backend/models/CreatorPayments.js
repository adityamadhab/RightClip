const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    holderName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    transactionId: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CreatorPayments', paymentSchema);