const express = require('express');
const router = express.Router();
const PointSettings = require('../models/PointSettings');

// Get current point settings
router.get('/', async (req, res) => {
    try {
        const settings = await PointSettings.findOne().sort({ createdAt: -1 });
        res.json(settings || { earningsPerProject: 10, qualityScorePerProject: 5 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update point settings
router.put('/update', async (req, res) => {
    try {
        const { earningsPerProject, qualityScorePerProject } = req.body;
        
        const newSettings = new PointSettings({
            earningsPerProject,
            qualityScorePerProject
        });

        await newSettings.save();
        res.json(newSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 