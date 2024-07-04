const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Creator = require('../models/Creator');
const authMiddleware = require('../middlewares/projectAuth');
const creatorMiddleware = require('../middlewares/authMiddleware');

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

router.get('/creator-projects', creatorMiddleware, async (req, res) => {
    try {
        const creatorId = req.user;

        const projects = await Project.find({ assignedCreator: creatorId, completed: false });

        if (!projects.length) {
            return res.status(404).json({ msg: 'No projects found for this creator' });
        }

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/creator/project-counts', creatorMiddleware, async (req, res) => {
    try {
        const creatorId = req.user;

        const completedProjects = await Project.find({ assignedCreator: creatorId, completed: true });

        const completedCount = await Project.countDocuments({ assignedCreator: creatorId, completed: true });

        const pendingProjects = await Project.find({ assignedCreator: creatorId, completed: false, assigned: true });

        const pendingCount = await Project.countDocuments({ assignedCreator: creatorId, completed: false, assigned: true });

        res.json({ completed: completedCount, pending: pendingCount });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/client/dashboard-counts', authMiddleware, async (req, res) => {
    try {
        const clientId = req.user.company;

        const totalProjects = await Project.countDocuments({ company: clientId });

        const totalContentPieces = await Project.countDocuments({ company: clientId, contentPiece: { $exists: true } });

        const pendingApprovals = await Project.countDocuments({ company: clientId, approvalStatus: 'pending' });

        const arrivingSoon = await Project.countDocuments({ company: clientId, arrivingSoon: true });

        res.json({
            totalProjects,
            totalContentPieces,
            pendingApprovals,
            arrivingSoon
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/admin/project-counts', async (req, res) => {
    try {

        // Ongoing projects count
        const ongoingProjects = await Project.countDocuments({ assigned: true, completed: false });
        console.log('Ongoing Projects:', ongoingProjects);  // Debugging line

        // Completed pieces count
        const completedPieces = await Project.countDocuments({ completed: true });
        console.log('Completed Pieces:', completedPieces);  // Debugging line

        // Pending approvals count
        const pendingApprovals = await Project.countDocuments({ approvalStatus: 'pending' });
        console.log('Pending Approvals:', pendingApprovals);  // Debugging line

        res.json({
            ongoingProjects,
            completedPieces,
            pendingApprovals
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/upload', creatorMiddleware, async (req, res) => {
    try {
        const { projectId, projectLink } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.projectLink = projectLink;
        project.completed = true;
        await project.save();

        res.status(200).json({ message: 'Project link uploaded successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
