const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const convert = require('pcm-convert');

const app = express();
const server = createServer(app);  // Link HTTP server to Express
const io = new Server(server);     // Create Socket.IO server



// Handle socket connection
io.on('connection', (socket) => {
    console.log('a user connected');

    // Example: receive message from client and send back a response
    socket.on('message', (msg) => {
        // console.log(msg)
        const { data, sequenceNumber } = msg
        const datas = data.map(byte => String.fromCharCode(byte)).join('')
        const sequenceNumbers = sequenceNumber.map(byte => String.fromCharCode(byte)).join('')
        console.log(`data:${datas} : sequenceNumbers:${sequenceNumbers}`);
        socket.emit('message', `Server received: ${data, sequenceNumber}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(3000, "0.0.0.0", () => {
    console.log('server running at 0.0.0.0:3000');
});
