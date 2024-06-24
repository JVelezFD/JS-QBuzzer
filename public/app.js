const socket = io();

const buzzButton = document.getElementById("buzzButton");
const resetButton = document.getElementById("resetButton");
const usernameInput = document.getElementById("username");
const messageDiv = document.getElementById("message");

buzzButton.addEventListener("click", () => {
  const username = usernameInput.value;
  if (username) {
    socket.emit("buzz", username);
  } else {
    alert("Please enter your name");
  }
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
