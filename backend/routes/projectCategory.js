const express = require('express');
const router = express.Router();
const ProjectCategory = require('../models/ProjectCategory');

router.post('/project-categories', async (req, res) => {
    try {
        const { name, templateImage, price } = req.body;
        const newProjectCategory = new ProjectCategory({ name, templateImage, price });
        await newProjectCategory.save();
        res.status(201).json(newProjectCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/project-categories', async (req, res) => {
    try {
        const projectCategories = await ProjectCategory.find();
        res.status(200).json(projectCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/templates/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const templates = await ProjectCategory.find({ name: categoryName });
        res.json(templates);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.put('/project-categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, templateImage, price } = req.body;

        const updatedProjectCategory = await ProjectCategory.findByIdAndUpdate(
            id,
            { name, templateImage, price },
            { new: true }
        );

        if (!updatedProjectCategory) {
            return res.status(404).json({ message: 'Project category not found' });
        }

        res.status(200).json(updatedProjectCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/project-categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ProjectCategory.findByIdAndDelete(id);
        res.status(200).json({ message: 'Project category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
