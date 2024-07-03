const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middlewares/projectAuth');

router.post('/create', authMiddleware, async (req, res) => {
    const { projectName, industry, preferences, company, creatorCategory } = req.body;
    const clientName = req.user.company;

    if (!clientName) {
        return res.status(400).send({ error: "Client name is required." });
    }

    try {
        const newProject = new Project({
            projectName,
            industry,
            preferences,
            company,
            creatorCategory,
            clientName
        });

        await newProject.save();
        res.status(201).send(newProject);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/get', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
