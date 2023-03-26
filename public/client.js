const socket = io();

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if(message) {
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }    
});

socket.on('chatMessage', (message) => {
    //const messageElement = document.getElementById('div');
    const messageElement = document.createElement('li');
    //messageElement.innerText = message;
    messageElement.textContent = message;
    messages.appendChild(messageElement);
});