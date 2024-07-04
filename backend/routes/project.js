const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Creator = require('../models/Creator');
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
        const projects = await Project.find({ assigned: false });
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/assign', async (req, res) => {
    const { projectId, creatorId } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const creator = await Creator.findById(creatorId);
        if (!creator) {
            return res.status(404).json({ msg: 'Creator not found' });
        }

        project.assignedCreator = creatorId;
        project.assigned = true;
        await project.save();

        res.json({ msg: 'Creator assigned successfully', project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/creator/:creatorId', async (req, res) => {
    try {
        const creatorId = req.params.creatorId;
        const projects = await Project.find({ assignedCreator: creatorId });

        if (!projects) {
            return res.status(404).json({ msg: 'No projects found for this creator' });
        }

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
