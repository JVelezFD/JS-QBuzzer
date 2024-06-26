const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let buzzedUser = null;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({ username, avatar, room }) => {
        socket.join(room);
        socket.username = username;
        socket.avatar = avatar; // Store the avatar URL or identifier
        socket.room = room;

        console.log(`${username} joined room ${room}`);
        io.to(room).emit('message', {
            username: username,
            message: `${username} has joined the room`,
            avatar: avatar // Send the avatar along with the message
        });
    });

    socket.on('buzz', () => {
        if (socket.room) {
            io.to(socket.room).emit('buzzed', {
                username: socket.username,
                avatar: socket.avatar
            });
        }
    });

    socket.on('reset', () => {
        if (socket.room) {
            io.to(socket.room).emit('reset');
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        if (socket.room) {
            io.to(socket.room).emit('message', {
                username: socket.username,
                message: `${socket.username} has left the room`,
                avatar: socket.avatar
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
