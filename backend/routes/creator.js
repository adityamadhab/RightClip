const express = require('express');
const router = express.Router();
const zod = require('zod');
const Creator = require('../models/Creator');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/signup', async (req, res) => {
    try {
        const validationResult = signupValidation.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                msg: "Invalid input.",
                errors: validationResult.error.errors
            });
        }

        const { firstName, lastName, industry, experience, email, phone, password, linkedin, resume, jobFunction, bio, workSample } = validationResult.data;

        const existingUser = await Creator.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await Creator.create({
            firstName, lastName, industry, experience, email, phone, password: hashedPassword, linkedin, resume, jobFunction, bio, workSample
        });

        return res.status(201).json({ user });
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

        const { email, password } = validationResult.data;

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

        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
