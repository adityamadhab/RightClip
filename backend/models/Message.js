const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'senderType'
        },
        senderType: {
            type: String,
            required: true,
            enum: ['Business', 'Creator']
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'receiverType'
        },
        receiverType: {
            type: String,
            required: true,
            enum: ['Business', 'Creator']
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
