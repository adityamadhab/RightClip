const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const CreatorPayments = require('../models/CreatorPayments');
const Project = require('../models/Project');

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

        const projectId =  req.params.projectId;

        const updatedpayment = await CreatorPayments.findOneAndUpdate({ projectId }, { transactionId: transactionId });

        await Project.findByIdAndUpdate(projectId, { CrePaymentDone: true });

        res.status(200).json(updatedpayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;