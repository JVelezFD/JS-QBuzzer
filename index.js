const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    console.log(`${username} joined room ${room}`);
    io.to(room).emit("message", `${username} has joined the room`);
  });

  socket.on("buzz", () => {
    if (socket.room) {
      io.to(socket.room).emit("buzzed", socket.username);
    }
  });

  socket.on("reset", () => {
    if (socket.room) {
      io.to(socket.room).emit("reset");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    if (socket.room) {
      io.to(socket.room).emit(
        "message",
        `${socket.username} has left the room`
      );
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
server.listen(PORT, HOST, () =>
  console.log(`Server running on http://${HOST}:${PORT}`)
);
