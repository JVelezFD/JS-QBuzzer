const socket = io();

const joinContainer = document.getElementById("join-container");
const buzzerContainer = document.getElementById("buzzer-container");
const buzzButton = document.getElementById("buzzButton");
const resetButton = document.getElementById("resetButton");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email"); // Email input field
const roomInput = document.getElementById("room");
const joinButton = document.getElementById("joinButton");
const messageDiv = document.getElementById("message");
const roomNameSpan = document.getElementById("roomName");

function getGravatarURL(email) {
  const emailHash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${emailHash}`;
}

joinButton.addEventListener("click", () => {
  const username = usernameInput.value;
  const email = emailInput.value;
  const avatar = getGravatarURL(email); // Generate Gravatar URL
  const room = roomInput.value;
  if (username && room && email) {
    socket.emit("joinRoom", { username, avatar, room });
    joinContainer.style.display = "none";
    buzzerContainer.style.display = "block";
    roomNameSpan.textContent = room;
  } else {
    alert("Please enter your name, email, and room");
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

  // Remove the join message after 3 seconds
  setTimeout(() => {
    messageDiv.removeChild(messageElement);
  }, 3000);
});
