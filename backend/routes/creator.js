const express = require('express');
const router = express.Router();
const zod = require('zod');
const Creator = require('../models/Creator');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const authMiddleware = require('../middlewares/authMiddleware');

const saltRounds = 10;

const signupValidation = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    industry: zod.string(),
    experience: zod.string(),
    phone: zod.string().min(10).max(15),
    email: zod.string().email(),
    password: zod.string().min(7),
    linkedin: zod.string(),
    resume: zod.string(),
    jobFunction: zod.string(),
    bio: zod.string(),
    workSample: zod.string(),
});

const signinValidation = zod.object({
    email: zod.string().email(),
    password: zod.string().min(7)
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your RightCliq OTP Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">Welcome to RightCliq</h2>
                    <p style="font-size: 16px; color: #333;">Hello,</p>
                    <p style="font-size: 16px; color: #333;">Your OTP code is:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</span>
                    </div>
                    <p style="font-size: 16px; color: #333;">Please use this code to complete your authentication. This code is valid for 5 minutes.</p>
                    <p style="font-size: 16px; color: #333;">If you did not request this OTP, please ignore this email or contact our support team.</p>
                    <p style="font-size: 16px; color: #333;">Thank you,</p>
                    <p style="font-size: 16px; color: #333;">The RightCliq Team</p>
                </div>
            `
        });
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending OTP email: ${error}`);
    }
}

async function sendApprovalEmail(email) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Profile Approved - RightCliq',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">Profile Approved</h2>
                    <p style="font-size: 16px; color: #333;">Hi,</p>
                    <p style="font-size: 16px; color: #333;">Your profile has been approved. You can now log in to your account.</p>
                    <p style="font-size: 16px; color: #333;">Thank you for being a part of RightCliq.</p>
                    <p style="font-size: 16px; color: #333;">Best regards,</p>
                    <p style="font-size: 16px; color: #333;">The RightCliq Team</p>
                </div>
            `
        });
        console.log(`Approval email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending approval email: ${error}`);
    }
}

let tempUsers = {};

async function checkOTP(req, res, next) {
    const { email, otp } = req.body;
    const tempUser = tempUsers[email];

    if (!tempUser) {
        return res.status(400).json({ msg: 'Invalid OTP or email' });
    }

    if (tempUser.otp !== otp || tempUser.otpExpiration < Date.now()) {
        return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    next();
}

router.post('/signup', async (req, res) => {
    try {
        const validationResult = signupValidation.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                msg: "Invalid input.",
                errors: validationResult.error.errors
            });
        }

        const { firstName, lastName, industry, experience, email, phone, password, linkedin, resume, jobFunction, bio, workSample } = req.body;

        const existingUser = await Creator.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const otp = generateOTP();
        const otpExpiration = Date.now() + 5 * 60 * 1000;

        tempUsers[email] = {
            firstName,
            lastName,
            industry,
            experience,
            phone,
            email,
            password: hashedPassword,
            linkedin,
            resume,
            jobFunction,
            bio,
            workSample,
            otp,
            otpExpiration
        };

        await sendOTPEmail(email, otp);

        return res.status(201).json({ msg: 'OTP sent to your email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/verify-otp', checkOTP, async (req, res) => {
    try {
        const { email } = req.body;

        const tempUser = tempUsers[email];

        if (!tempUser) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const user = await Creator.create(tempUser);

        delete tempUsers[email];

        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

        return res.json({ token, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/signin', async (req, res) => {
    try {
        const validationResult = signinValidation.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(401).json({
                msg: "Incorrect credentials",
                errors: validationResult.error.errors
            });
        }

        const { email, password } = req.body;

        const user = await Creator.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "Incorrect credentials"
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({
                msg: "Incorrect credentials"
            });
        }

        const token = jwt.sign({ user: user._id, type: 'Creator' }, process.env.JWT_SECRET);

        return res.json({ token, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await Creator.findById(req.user);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Creator.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const otp = generateOTP();
        const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        user.otp = otp;
        user.otpExpiration = otpExpiration;
        await user.save();

        await sendOTPEmail(email, otp);

        return res.status(200).json({ msg: 'OTP sent to your email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await Creator.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiration = null;
        await user.save();

        return res.status(200).json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/non-approved', async (req, res) => {
    try {
        const nonApprovedCreators = await Creator.find({ approval: false });
        res.json(nonApprovedCreators);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/approved', async (req, res) => {
    try {
        const approvedCreators = await Creator.find({ approval: true });
        res.json(approvedCreators);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const creator = await Creator.findById(req.params.id).select('-password');
        if (!creator) {
            return res.status(404).json({ msg: 'Creator not found' });
        }
        res.json(creator);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/approve/:id', async (req, res) => {
    try {
        const creator = await Creator.findById(req.params.id);

        if (!creator) {
            return res.status(404).json({ msg: 'Creator not found' });
        }

        creator.approval = true;
        await creator.save();

        await sendApprovalEmail(creator.email);

        res.json({ msg: 'Creator approved successfully', creator });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/', async (req, res) => {
    try {
        const creators = await Creator.find().select('-password');
        res.json(creators);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
