const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000, host: "0.0.0.0" });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Server: ${message}`);
    });


    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on 3000');
