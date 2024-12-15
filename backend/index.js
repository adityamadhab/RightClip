const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Conversation = require('./models/Conversation');
const rootRouter = require('./routes/root');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Your frontend URL
        methods: ["GET", "POST"]
    }
});

// Socket.IO authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        socket.userType = decoded.userType;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);

    // Join user's personal room
    socket.join(socket.userId);

    // Handle joining conversation rooms
    socket.on('join', async ({ userId }) => {
        try {
            // Find all conversations involving this user
            const conversations = await Conversation.find({
                'participants.participantId': userId
            });

            // Join all conversation rooms
            conversations.forEach(conversation => {
                socket.join(conversation._id.toString());
                console.log(`Socket ${socket.id} joined conversation ${conversation._id}`);
            });
        } catch (error) {
            console.error('Error joining rooms:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.userId);
    });
});

// Make io available to routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/v1', (req, res, next) => {
    req.io = io; // Attach socket.io instance to the request object
    next();
}, rootRouter);

server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
