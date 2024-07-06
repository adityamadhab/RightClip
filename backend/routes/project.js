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

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.status(200).send({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting project', error });
    }
});

router.get('/get', async (req, res) => {
    try {
        const projects = await Project.find({ assigned: false, review: false });
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/ongoing', async (req, res) => {
    try {
        const projects = await Project.find({ assigned: true, review: false }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = projects.map(project => ({
            projectId: project._id,
            projectName: project.projectName,
            company: project.company,
            assignedCreator: project.assignedCreator 
                ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                : null,
            assigned: project.assigned,
            completed: project.completed,
            review: project.review,
            projectLink: project.projectLink
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching review projects:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/completed', async (req, res) => {
    try {
        const projects = await Project.find({ completed: true, review: true }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = projects.map(project => ({
            projectId: project._id,
            projectName: project.projectName,
            company: project.company,
            assignedCreator: project.assignedCreator 
                ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                : null,
            assigned: project.assigned,
            completed: project.completed,
            review: project.review,
            projectLink: project.projectLink
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching review projects:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/review', async (req, res) => {
    try {
        const projects = await Project.find({ review: true, completed: false }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = projects.map(project => ({
            projectId: project._id,
            projectName: project.projectName,
            assignedCreator: project.assignedCreator 
                ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                : null,
            assigned: project.assigned,
            completed: project.completed,
            review: project.review,
            projectLink: project.projectLink
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching review projects:', error);
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

        const projects = await Project.find({ assignedCreator: creatorId, completed: false, review: false });

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
        const ongoingProjects = await Project.countDocuments({ assigned: true, completed: false });

        const completedPieces = await Project.countDocuments({ completed: true });

        const pendingApprovals = await Project.countDocuments({ approvalStatus: 'pending' });

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

router.get('/client/project-status', authMiddleware, async (req, res) => {
    try {
        const clientId = req.user.company;

        if (!clientId) {
            return res.status(400).send({ error: "Client ID is required." });
        }

        const projects = await Project.find({ company: clientId }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = projects.map(project => ({
            projectName: project.projectName,
            assignedCreator: project.assignedCreator 
                ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                : null,
            assigned: project.assigned,
            completed: project.completed,
            review: project.review,
            projectLink: project.projectLink,
            approvalStatus: project.approvalStatus,
            arrivingSoon: project.arrivingSoon
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching project statuses:', error);
        res.status(500).json({ error: error.message });
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
        project.review = true;
        project.completed = false;
        await project.save();

        res.status(200).json({ message: 'Project link uploaded successfully, pending admin review', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/admin/approve', async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.review = true;
        project.completed = true;
        await project.save();

        res.status(200).json({ message: 'Project approved and marked as completed', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/admin/decline', async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.review = false;
        project.completed = false;
        await project.save();

        res.status(200).json({ message: 'Project declined and ready for re-upload', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
