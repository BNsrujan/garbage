const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);  // Link HTTP server to Express
const io = new Server(server);     // Create Socket.IO server



// Handle socket connection
io.on('connection', (socket) => {
    console.log('a user connected');

    // Example: receive message from client and send back a response
    socket.on('message', (msg) => {
        console.log(`Message from client: ${msg}`);
        socket.emit('message', `Server received: ${msg}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
server.listen(3000, "0.0.0.0", () => {
    console.log('server running at 0.0.0.0:3000');
});
