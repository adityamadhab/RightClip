const express = require('express');
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation.js');
const Message = require('../models/Message.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/business-to-creator/:receiverId', authMiddleware, async (req, res) => {
    try {
        const { message } = req.body;
        const { receiverId } = req.params;
        const senderId = req.user;
        const senderType = req.userType;

        if (senderType !== 'Business') {
            return res.status(403).json({ error: 'Only Business can send messages to Creator' });
        }

        let conversation = await Conversation.findOne({
            $or: [
                { 
                    $and: [
                        { "participants.participantId": senderId, "participants.participantType": 'Business' },
                        { "participants.participantId": receiverId, "participants.participantType": 'Creator' }
                    ]
                },
                {
                    $and: [
                        { "participants.participantId": senderId, "participants.participantType": 'Creator' },
                        { "participants.participantId": receiverId, "participants.participantType": 'Business' }
                    ]
                }
            ]
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [
                    { participantId: senderId, participantType: 'Business' },
                    { participantId: receiverId, participantType: 'Creator' }
                ],
                messages: []
            });
        }

        const newMessage = new Message({
            senderId,
            senderType: 'Business',
            receiverId,
            receiverType: 'Creator',
            message,
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        // Emit to both sender and receiver rooms
        const messageWithDetails = await Message.findById(newMessage._id)
            .lean() // Convert to plain JavaScript object
            .exec();

        // Broadcast to all connected clients in the conversation
        const roomId = conversation._id.toString();
        req.io.to(roomId).emit('newMessage', messageWithDetails);

        // Also emit to individual user rooms
        req.io.to(senderId.toString()).emit('newMessage', messageWithDetails);
        req.io.to(receiverId.toString()).emit('newMessage', messageWithDetails);

        res.status(201).json(messageWithDetails);
    } catch (error) {
        console.error('Error in business-to-creator route: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/creator-to-business/:receiverId', authMiddleware, async (req, res) => {
    try {
        const { message } = req.body;
        const { receiverId } = req.params;
        const senderId = req.user;
        const senderType = req.userType;

        if (senderType !== 'Creator') {
            return res.status(403).json({ error: 'Only Creator can send messages to Business' });
        }

        let conversation = await Conversation.findOne({
            $or: [
                { 
                    $and: [
                        { "participants.participantId": senderId, "participants.participantType": 'Creator' },
                        { "participants.participantId": receiverId, "participants.participantType": 'Business' }
                    ]
                },
                {
                    $and: [
                        { "participants.participantId": senderId, "participants.participantType": 'Business' },
                        { "participants.participantId": receiverId, "participants.participantType": 'Creator' }
                    ]
                }
            ]
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [
                    { participantId: senderId, participantType: 'Creator' },
                    { participantId: receiverId, participantType: 'Business' }
                ],
                messages: []
            });
        }

        const newMessage = new Message({
            senderId,
            senderType: 'Creator',
            receiverId,
            receiverType: 'Business',
            message,
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        // Emit to both sender and receiver rooms
        const messageWithDetails = await Message.findById(newMessage._id)
            .lean() // Convert to plain JavaScript object
            .exec();

        // Broadcast to all connected clients in the conversation
        const roomId = conversation._id.toString();
        req.io.to(roomId).emit('newMessage', messageWithDetails);

        // Also emit to individual user rooms
        req.io.to(senderId.toString()).emit('newMessage', messageWithDetails);
        req.io.to(receiverId.toString()).emit('newMessage', messageWithDetails);

        res.status(201).json(messageWithDetails);
    } catch (error) {
        console.error('Error in creator-to-business route: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/get-messages/:userToChatId/:userToChatType', authMiddleware, async (req, res) => {
    try {
        const { userToChatId, userToChatType } = req.params;
        const senderId = req.user;
        const senderType = req.userType;

        if (senderType === userToChatType) {
            return res.status(403).json({ error: 'Conversation must be between Business and Creator' });
        }

        const conversation = await Conversation.findOne({
            $or: [
                { 
                    $and: [
                        { "participants.participantId": senderId, "participants.participantType": senderType },
                        { "participants.participantId": userToChatId, "participants.participantType": userToChatType }
                    ]
                },
                {
                    $and: [
                        { "participants.participantId": userToChatId, "participants.participantType": senderType },
                        { "participants.participantId": senderId, "participants.participantType": userToChatType }
                    ]
                }
            ]
        }).populate('messages');

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error in getMessages route: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
