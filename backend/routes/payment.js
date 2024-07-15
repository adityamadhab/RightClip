const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const CreatorPayments = require('../models/CreatorPayments');
const Project = require('../models/Project');
const Creator = require('../models/Creator');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendPaymentEmail(email, projectName) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Payment Received for Your Project - RightCliq',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">Payment Received for Your Project</h2>
                    <p style="font-size: 16px; color: #333;">Hi Creator,</p>
                    <p style="font-size: 16px; color: #333;">We are pleased to inform you that the payment for your project <b>${projectName}</b> has been successfully processed and credited to your bank account.</p>
                    <p style="font-size: 16px; color: #333;">Please check your profile for more details. If you have any questions or need further assistance, feel free to reach out to our support team.</p>
                    <p style="font-size: 16px; color: #333;">Thank you,</p>
                    <p style="font-size: 16px; color: #333;">The RightCliq Team</p>
                </div>
            `
        });
        console.log(`Payment confirmation email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending payment confirmation email: ${error}`);
    }
}

router.post('/submit', authMiddleware, async (req, res) => {
    try {
        const creatorId = req.user;

        const { projectId, projectName, accountNumber, ifscCode, holderName, bankName } = req.body;

        const newPayment = new CreatorPayments({
            projectId,
            creatorId: creatorId,
            projectName,
            accountNumber,
            ifscCode,
            holderName,
            bankName
        });

        const savedPayment = await newPayment.save();

        await Project.findByIdAndUpdate(projectId, { crePayDetails: true });

        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/creator/:creatorId', async (req, res) => {
    try {
        const payments = await CreatorPayments.find({ creatorId: req.params.creatorId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/project/:projectId', async (req, res) => {
    try {
        const payments = await CreatorPayments.findOne({ projectId: req.params.projectId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/project/:projectId', async (req, res) => {
    try {
        const { transactionId } = req.body;
        const projectId = req.params.projectId;

        const updatedPayment = await CreatorPayments.findOneAndUpdate({ projectId }, { transactionId: transactionId });

        const project = await Project.findByIdAndUpdate(projectId, { CrePaymentDone: true });

        const creator = await Creator.findById(project.assignedCreator);

        if (!creator) {
            return res.status(404).json({ message: 'Creator not found' });
        }

        const creatorEmail = creator.email;

        await sendPaymentEmail(creatorEmail, project.projectName, transactionId);

        const notification = new Notification({
            recieverId: creator._id,
            message: `Payment for project ${project.projectName} has been updated with transaction ID: ${transactionId}.`
        });
        await notification.save();

        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;