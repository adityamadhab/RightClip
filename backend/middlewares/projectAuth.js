const jwt = require('jsonwebtoken');
const User = require('../models/Business');
const JWT_SECRET = process.env.JWT_SECRET;

const projectAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const decoded = await jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.user);

        if (!user) {
            return res.status(401).json({ msg: 'User not found, authorization denied' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = projectAuth;
