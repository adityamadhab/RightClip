const express = require('express');
const router = express.Router();
const zod = require('zod');
const Admin = require('../models/Admin');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const signupValidation = zod.object({
    email: zod.string().email(),
    password: zod.string().min(7)
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

        const { email, password } = req.body;

        const existingUser = await Admin.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await Admin.create({
            email,
            password: hashedPassword
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

        const { email, password } = req.body;

        const user = await Admin.findOne({ email });

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
