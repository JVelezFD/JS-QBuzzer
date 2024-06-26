const socket = io();

const joinContainer = document.getElementById("join-container");
const buzzerContainer = document.getElementById("buzzer-container");
const buzzButton = document.getElementById("buzzButton");
const resetButton = document.getElementById("resetButton");
const usernameInput = document.getElementById("username");
const avatarInput = document.getElementById("avatar"); // Add avatar input field
const roomInput = document.getElementById("room");
const joinButton = document.getElementById("joinButton");
const messageDiv = document.getElementById("message");
const roomNameSpan = document.getElementById("roomName");

joinButton.addEventListener("click", () => {
  const username = usernameInput.value;
  const avatar = avatarInput.value; // Get avatar URL from input
  const room = roomInput.value;
  if (username && room) {
    socket.emit("joinRoom", { username, avatar, room });
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

socket.on("buzzed", (data) => {
  const { username, avatar } = data;
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<img src="${avatar}" alt="${username}" class="avatar"> ${username} buzzed first!`;
  messageDiv.appendChild(messageElement);
});

socket.on("reset", () => {
  messageDiv.textContent = "";
});

socket.on("message", (data) => {
  const { username, message, avatar } = data;
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<img src="${avatar}" alt="${username}" class="avatar"> ${message}`;
  messageDiv.appendChild(messageElement);
});
