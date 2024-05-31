// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.set('io', io);


// Middlewares
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/items/:itemId/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.json("API is working");
});

// Socket.io
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected!');

        // Sync the database
        await sequelize.sync({ force: false }); // 'force: false' ensures that tables are not dropped and recreated every time the server restarts.
        console.log('Tables created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

// Export io object
module.exports = { app, server, io };
