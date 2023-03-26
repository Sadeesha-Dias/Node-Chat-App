const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

server.listen(4050, () => {
    console.log('Server is up and running on port 4050');
});

io.on('connection', (socket) => {
    console.log('A user has connected!');

    // Send a welcome message to the newly connected client
    socket.emit('chatMessage', 'Welcome to the chat app!');

    // Listen for incoming messages from the client
    socket.on('chatMessage', (message) => {
        console.log('Client-message: ' + message);

        // Broadcast the message to all connected clients
        io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected!');
    });

    // socket.on('chatMessage', (message) => {
    //     io.emit('message', message);
    // });
});