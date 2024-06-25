const socket = io();

const joinContainer = document.getElementById("join-container");
const buzzerContainer = document.getElementById("buzzer-container");
const buzzButton = document.getElementById("buzzButton");
const resetButton = document.getElementById("resetButton");
const usernameInput = document.getElementById("username");
const roomInput = document.getElementById("room");
const joinButton = document.getElementById("joinButton");
const messageDiv = document.getElementById("message");
const roomNameSpan = document.getElementById("roomName");

joinButton.addEventListener("click", () => {
  const username = usernameInput.value;
  const room = roomInput.value;
  if (username && room) {
    socket.emit("joinRoom", { username, room });
    joinContainer.style.display = "none";
    buzzerContainer.style.display = "block";
    roomNameSpan.textContent = room;
  } else {
    alert("Please enter your name and room");
  }
});

buzzButton.addEventListener("click", () => {
  socket.emit("buzz");
});

resetButton.addEventListener("click", () => {
  socket.emit("reset");
});

socket.on("buzzed", (username) => {
  messageDiv.textContent = `${username} buzzed first!`;
});

socket.on("reset", () => {
  messageDiv.textContent = "";
});

socket.on("message", (message) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageDiv.appendChild(messageElement);
});
