const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Creator = require('../models/Creator');
const ProjectCategory = require('../models/ProjectCategory');
const authMiddleware = require('../middlewares/projectAuth');
const creatorMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, async (req, res) => {
    const { projectName, industry, requirements, company, projectCategory } = req.body;
    const clientName = req.user.company;

    if (!clientName) {
        return res.status(400).send({ error: "Client name is required." });
    }

    try {
        const newProject = new Project({
            projectName,
            industry,
            requirements,
            company,
            projectCategory,
            clientName
        });

        await newProject.save();
        res.status(201).send(newProject);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/admin/cancel', async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.cancelled = true;
        await project.save();

        res.status(200).json({ message: 'Project declined and ready for re-upload', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
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
        const projects = await Project.find({ creatorApproval: true, assigned: true, review: false }).populate('assignedCreator', 'firstName lastName');

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
        const projects = await Project.find({ review: true, creatorApproval: true, completed: false, businessApproval: false }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = await Promise.all(projects.map(async (project) => {
            const projectCategory = await ProjectCategory.findOne({ name: project.projectCategory });
            
            return {
                projectId: project._id,
                projectName: project.projectName,
                company: project.company,
                industry: project.industry,
                projectCategory: project.projectCategory,
                requirements: project.requirements,
                assignedCreator: project.assignedCreator 
                    ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                    : null,
                assigned: project.assigned,
                completed: project.completed,
                review: project.review,
                projectLink: project.projectLink,
                templateImage: projectCategory ? projectCategory.templateImage : null
            };
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

router.get('/accept-projects', creatorMiddleware, async (req, res) => {
    try {
        const creatorId = req.user;

        const projects = await Project.find({ assignedCreator: creatorId, creatorApproval: false, assigned: true, review: false });

        if (!projects.length) {
            return res.status(404).json({ msg: 'No projects found for this creator' });
        }

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/creator-projects', creatorMiddleware, async (req, res) => {
    try {
        const creatorId = req.user;

        const projects = await Project.find({ assignedCreator: creatorId, creatorApproval: true, completed: false, review: false });

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

        const pendingCount = await Project.countDocuments({ assignedCreator: creatorId, creatorApproval: true, completed: false, assigned: true });

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

        const completedProjects = await Project.countDocuments({ company: clientId, completed: true });

        const pendingApprovals = await Project.countDocuments({ company: clientId, creatorApproval: false });

        const cancalled = await Project.countDocuments({ company: clientId, cancelled: true });

        res.json({
            totalProjects,
            completedProjects,
            pendingApprovals,
            cancalled
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/client/dashboard-details', authMiddleware, async (req, res) => {
    try {
        const clientId = req.user.company;

        const pendingProjects = await Project.find({ company: clientId, assigned: false });

        const activeProjects = await Project.find({ company: clientId, assigned: true, review: false, creatorApproval: false  });

        const arrivingProjects = await Project.fing({ company: clientId, creatorApproval: false, })

        res.json({
            pendingProjects,
            activeProjects,
            arrivingProjects
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

router.get('/client/active-projects', authMiddleware, async (req, res) => {
    try {
        const clientId = req.user.company;

        if (!clientId) {
            return res.status(400).send({ error: "Client ID is required." });
        }

        const projects = await Project.find({ company: clientId, creatorApproval: true, completed: false }).populate('assignedCreator', 'firstName lastName');

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching project statuses:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/client/pending-projects', authMiddleware, async (req, res) => {
    try {
        const clientId = req.user.company;

        if (!clientId) {
            return res.status(400).send({ error: "Client ID is required." });
        }

        const projects = await Project.find({ company: clientId, assigned: false }).populate('assignedCreator', 'firstName lastName');

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching project statuses:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/client/review-projects', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ review: true, creatorApproval: true, completed: false, businessApproval: true }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = await Promise.all(projects.map(async (project) => {
            const projectCategory = await ProjectCategory.findOne({ name: project.projectCategory });
            
            return {
                projectId: project._id,
                projectName: project.projectName,
                company: project.company,
                industry: project.industry,
                projectCategory: project.projectCategory,
                requirements: project.requirements,
                assignedCreator: project.assignedCreator 
                    ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                    : null,
                assigned: project.assigned,
                completed: project.completed,
                review: project.review,
                projectLink: project.projectLink,
                templateImage: projectCategory ? projectCategory.templateImage : null
            };
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching review projects:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/client/completed-projects', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ review: true, creatorApproval: true, completed: true, businessApproval: true }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = await Promise.all(projects.map(async (project) => {
            
            return {
                projectId: project._id,
                projectName: project.projectName,
                assignedCreator: project.assignedCreator 
                    ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                    : null,
                assigned: project.assigned,
                completed: project.completed,
                review: project.review,
                projectLink: project.projectLink
            };
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching review projects:', error);
        res.status(400).json({ error: error.message });
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

router.put('/creator/aceept', creatorMiddleware, async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.creatorApproval = true;
        await project.save();

        res.status(200).json({ message: 'Project accepted by creator.', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/creator/decline', creatorMiddleware, async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.assigned = false;
        project.creatorApproval = false;
        await project.save();

        res.status(200).json({ message: 'Project declined by creator', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/business/approve', authMiddleware, async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.businessApproval = true;
        project.completed = true;
        await project.save();

        res.status(200).json({ message: 'Project approved and marked as completed', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/business/decline', authMiddleware, async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.businessApproval = false;
        project.completed = false;
        await project.save();

        res.status(200).json({ message: 'Project declined and ready for re-upload', project });
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
        project.businessApproval = true;
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
