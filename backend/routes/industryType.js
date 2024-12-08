const express = require('express');
const router = express.Router();
const IndustryType = require('../models/IndustryTypes');

router.post('/industry-types', async (req, res) => {
    try {
        const { name } = req.body;
        const newIndustryType = new IndustryType({ name });
        await newIndustryType.save();
        res.status(201).json(newIndustryType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/industry-types', async (req, res) => {
    try {
        const industryTypes = await IndustryType.find();
        res.status(200).json(industryTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/industry-types/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await IndustryType.findByIdAndDelete(id);
        res.status(200).json({ message: 'Industry type deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/industry-types/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedIndustryType = await IndustryType.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedIndustryType) {
            return res.status(404).json({ message: 'Industry type not found' });
        }

        res.status(200).json(updatedIndustryType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
