const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let buzzedUser = null;

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('buzz', (username) => {
        if (!buzzedUser) {
            buzzedUser = username;
            io.emit('buzzed', username);
        }
    });

    socket.on('reset', () => {
        buzzedUser = null;
        io.emit('reset');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('public'));
