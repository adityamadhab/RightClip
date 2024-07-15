const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    message: {
        type: String,
        require: true
    },
    readMark: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);