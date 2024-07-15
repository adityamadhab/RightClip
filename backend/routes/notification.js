const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddlware = require('../middlewares/authMiddleware');

router.post('/create', async (req, res) => {
    try {
        const { recieverId, message } = req.body;
        const notification = new Notification({
            recieverId,
            message
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/get', authMiddlware, async (req, res) => {
    try {
        const notifications = await Notification.find({ recieverId: req.user });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id/read', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { readMark: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/unread/count', authMiddlware, async (req, res) => {
    try {
        const unreadCount = await Notification.countDocuments({ recieverId: req.user, readMark: false });
        res.status(200).json({ unreadCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;