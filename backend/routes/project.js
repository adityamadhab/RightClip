const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Creator = require('../models/Creator');
const Business = require('../models/Business');
const ProjectCategory = require('../models/ProjectCategory');
const Notification = require('../models/Notification');
const authMiddleware = require('../middlewares/projectAuth');
const creatorMiddleware = require('../middlewares/authMiddleware');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendProjectAcceptanceEmail(email, projectName) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Project Assigned to Creator - RightCliq',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">Project Assigned to Creator</h2>
                    <p style="font-size: 16px; color: #333;">Hi,</p>
                    <p style="font-size: 16px; color: #333;">Your project <b>${projectName}</b> has been assigned to a creator. Check your profile to get more details.</p>
                    <p style="font-size: 16px; color: #333;">You can communicate with the creator through the inbox messaging system.</p>
                    <p style="font-size: 16px; color: #333;">Thank you,</p>
                    <p style="font-size: 16px; color: #333;">The RightCliq Team</p>
                </div>
            `
        });
        console.log(`Project acceptance email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending project acceptance email: ${error}`);
    }
}

async function sendAdminAcceptanceEmail(email, projectName) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Project Review - RightCliq',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">Project Available for Review</h2>
                    <p style="font-size: 16px; color: #333;">Hi,</p>
                    <p style="font-size: 16px; color: #333;">Your project <b>${projectName}</b> is available for review.</p>
                    <p style="font-size: 16px; color: #333;">Please visit the "Review Assignments" page in your dashboard to accept or decline the project.</p>
                    <p style="font-size: 16px; color: #333;">P.S - PLEASE DO PAY YOUR PROJECT PAYMENT TO GET THE COMPLETE REVIEW LIST.</p>
                    <p style="font-size: 16px; color: #333;">Thank you,</p>
                    <p style="font-size: 16px; color: #333;">The RightCliq Team</p>
                </div>
            `
        });
        console.log(`Project acceptance email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending project acceptance email: ${error}`);
    }
}

router.post('/create', authMiddleware, async (req, res) => {
    const { projectName, industry, requirements, company, projectCategory } = req.body;
    const clientName = req.user.company;

    if (!clientName) {
        return res.status(400).send({ error: "Client name is required." });
    }

    try {
        const newProject = new Project({
            companyId: req.user._id,
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

router.get('/business/assigned-creators', authMiddleware, async (req, res) => {
    try {
        const clientId = req.user.company;

        const projects = await Project.find({ company: clientId, assigned: true, completed: false }).populate('assignedCreator', 'firstName lastName email');

        const creatorMap = new Map();

        projects.forEach(project => {
            if (project.assignedCreator) {
                const creatorId = project.assignedCreator._id.toString();
                if (!creatorMap.has(creatorId)) {
                    creatorMap.set(creatorId, {
                        creatorId: project.assignedCreator._id,
                        firstName: project.assignedCreator.firstName,
                        lastName: project.assignedCreator.lastName,
                        email: project.assignedCreator.email,
                        projects: [] // initialize an array to hold project names
                    });
                }
                creatorMap.get(creatorId).projects.push(project.projectName); // add project name to the array
            }
        });

        const uniqueCreators = Array.from(creatorMap.values());

        res.status(200).json(uniqueCreators);
    } catch (error) {
        console.error('Error fetching assigned creators:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/creator/assigned-businesses', creatorMiddleware, async (req, res) => {
    try {
        const creatorId = req.user;
        const projects = await Project.find({
            assignedCreator: creatorId,
            assigned: true,
            completed: false
        }).populate('company');

        const businesses = {};

        await Promise.all(projects.map(async (project) => {
            const companyId = project.company;
            const client = await Business.findOne({ company: companyId });

            if (!businesses[companyId]) {
                businesses[companyId] = {
                    businessId: client._id,
                    companyName: project.company,
                    projects: []
                };
            }

            businesses[companyId].projects.push(project.projectName);
        }));

        const uniqueBusinesses = Object.values(businesses);

        res.status(200).json(uniqueBusinesses);
    } catch (error) {
        console.error('Error fetching assigned businesses:', error);
        res.status(500).json({ error: error.message });
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

        const activeProjects = await Project.find({ company: clientId, assigned: true, review: false, creatorApproval: false });

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
        const clientId = req.user.company;

        const projects = await Project.find({ company: clientId, review: true, creatorApproval: true, completed: false, businessApproval: true, paymentDone: true }).populate('assignedCreator', 'firstName lastName');

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
        const clientId = req.user.company;

        const projects = await Project.find({ company: clientId, review: true, creatorApproval: true, completed: true, businessApproval: true, paymentDone: true }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = await Promise.all(projects.map(async (project) => {

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
                projectLink: project.projectLink
            };
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching review projects:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/client/payment-projects', authMiddleware, async (req, res) => {
    try {
        const clientId = req.user.company;

        const projects = await Project.find({ company: clientId, creatorApproval: true, paymentDone: false }).populate('assignedCreator', 'firstName lastName');

        const projectStatuses = await Promise.all(projects.map(async (project) => {
            const projectCategory = await ProjectCategory.findOne({ name: project.projectCategory });

            return {
                projectId: project._id,
                projectName: project.projectName,
                assignedCreator: project.assignedCreator
                    ? `${project.assignedCreator.firstName} ${project.assignedCreator.lastName}`
                    : null,
                price: projectCategory ? projectCategory.price : null
            };
        }));

        res.status(200).json(projectStatuses);
    } catch (error) {
        console.error('Error fetching review projects:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/creator/payment-projects', creatorMiddleware, async (req, res) => {
    try {
        const creatorId = req.user;

        const projects = await Project.find({ assignedCreator: creatorId, creatorApproval: true, crePayDetails: false });

        if (!projects.length) {
            return res.status(404).json({ msg: 'No projects found for this creator' });
        }

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/admin/business-payment', async (req, res) => {
    try {

        const projects = await Project.find({ creatorApproval: true, paymentDone: true }).populate('assignedCreator', 'firstName lastName');

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching project statuses:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/admin/creator-payment', async (req, res) => {
    try {

        const projects = await Project.find({ creatorApproval: true, crePayDetails: true, CrePaymentDone: false });

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching project statuses:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/admin/reject-payment/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (!project.paymentDone) {
            return res.status(400).json({ error: 'No payment to reject' });
        }

        project.paymentId = null;
        project.paymentDone = false;

        await project.save();

        res.status(200).json({ message: 'Payment successfully rejected.', project });
    } catch (error) {
        console.error('Error rejecting payment:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/client/make-payment', authMiddleware, async (req, res) => {
    try {
        const { projectId, paymentId } = req.body;

        if (!projectId) {
            return res.status(400).send({ error: "Client ID is required." });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).send({ error: "Project not found." });
        }

        project.paymentId = paymentId;
        project.paymentDone = true;

        await project.save();

        res.status(200).json({ message: 'Payment successfully done.', project });
    } catch (error) {
        console.error('Error making project payment:', error);
        res.status(500).json({ error: error.message });
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

router.put('/creator/accept', creatorMiddleware, async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.creatorApproval = true;
        await project.save();

        const business = await Business.findById(project.companyId);

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const businessEmail = business.email;

        await sendProjectAcceptanceEmail(businessEmail, project.projectName);

        const notification = new Notification({
            recieverId: business._id,
            message: `Project ${project.projectName} has been accepted by the creator.`
        });
        await notification.save();

        res.status(200).json({ message: 'Project accepted by creator.', project });
    } catch (error) {
        console.error(error);
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

        project.assignedCreator = null;
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
        const { projectId, projectFeedback, rating } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.businessApproval = true;
        project.completed = true;
        project.projectFeedback = projectFeedback || '';
        project.businessRating = rating;
        await project.save();

        res.status(200).json({ message: 'Project approved and marked as completed', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/business/decline', authMiddleware, async (req, res) => {
    try {
        const { projectId, projectFeedback, qualityScore } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.businessApproval = false;
        project.completed = false;
        project.projectFeedback = projectFeedback || '';
        project.qualityScore = qualityScore;
        await project.save();

        res.status(200).json({ message: 'Project declined and ready for re-upload', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/admin/approve', async (req, res) => {
    try {
        const { projectId, projectFeedback, rating } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.projectFeedback = projectFeedback || '';
        project.qualityScore = 0;
        project.rating = rating;
        project.review = true;
        project.businessApproval = true;
        await project.save();

        const business = await Business.findById(project.companyId);

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const businessEmail = business.email;

        await sendAdminAcceptanceEmail(businessEmail, project.projectName);

        const notification = new Notification({
            recieverId: business._id,
            message: `Project ${project.projectName} is availablefor Review. Please visit your dashboard to get details.`
        });
        await notification.save();

        res.status(200).json({ message: 'Project approved and marked as completed', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/admin/decline', async (req, res) => {
    try {
        const { projectId, projectFeedback, qualityScore } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.review = false;
        project.completed = false;
        project.projectFeedback = projectFeedback;
        project.qualityScore = qualityScore;
        await project.save();

        res.status(200).json({ message: 'Project declined with feedback', project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;