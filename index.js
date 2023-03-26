const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const readline = require('readline');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//creating a readline interface to read input from the terminal
const serverInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.use(express.static(__dirname + '/public'));

server.listen(4050, () => {
    console.log('Server is up and running on port 4050');
});

io.on('connection', (socket) => {
    console.log('A user has connected!');

    // Send a welcome message to the newly connected client
    socket.emit('chatMessage', 'Welcome to the chat app!');

    // socket.on('chatMessage', (message) => {
    //     io.emit('message', message);

    //     if(message.startsWith('Server: ')) {
    //         socket.emit('chatMessage', message);
    //     }else{
    //         socket.broadcast.emit('chatMessage', message);
    //     }
    // });

    
    // Listen for incoming messages from the client
    socket.on('chatMessage', (message) => {
        console.log('Client: ' + message);

        // Broadcast the message to all connected clients
        io.emit('chatMessage', 'Client: ' + message);
    });

    //Listen for input from the terminal (server side)
    serverInput.on('line', (input) => {
        //emit the input to all the connected clients
        socket.broadcast.emit('chatMessage', 'Server: ' + input)
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected!');
    });

    
});