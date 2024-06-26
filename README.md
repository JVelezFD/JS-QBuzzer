
# QBuzzer App

A simple buzzer web application that allows users to join a room, buzz in, and see who buzzed first. The app features a Neo-Brutalism theme for a bold, geometric, and vibrant user interface. Goal of the app is to allow gamenight host a way to allow players/teams a way to buzz to answer question or whatever the game host would like to use it for or leave it up to users imagination.


## Features

- Join Room:Users can join a room by entering their name, email (for Gravatar avatars), and room name.
- Buzz In: Users can buzz in to indicate they are ready to answer a question.
- Reset: The host can reset the buzzers.



## Tech Stack

**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js, Express.js, Socket.io

**Gravatar:** For user avatars based on email


## Installation

Install QBuzzer

1. ***Clone the repository*** 

```bash
git clone https://github.com/yourusername/buzzer-app.git
cd buzzer-app
```

2. ***Install dependencies***

```bash
npm install

```

3. ***Run App***

```bash
node server.js

```

4. ***Open your browser and navigate to http://localhost:3000.***
## Usage/Examples


![QBuzzer App](https://github.com/JVelezFD/QBuzzer/assets/101678295/9f7e15ac-f44a-433d-a980-72c9db8fc7e9)

1. ***Join a Room:***
- Enter your name, email, and room name.
- Click the "Join Room" button.
- The app fetches your Gravatar avatar based on the email provided.

2. ***Buzz In:*** 
 - Click the "Buzz!" button to buzz in. The first user to buzz in will be displayed.

3. ***Reset:***
 - Click the "Reset" button to reset the buzzers.

4. ***Gravatar Integration:***
The app uses Gravatar for user avatars:
- Users provide their email when joining a room.
- The email is hashed using MD5 to generate the Gravatar URL.
- The Gravatar avatar is displayed next to the user's name when they buzz in.
- Recommend users signing up for Gravatar to have avatar pop up.
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Acknowledgements

- Socket.io for real-time communication.
- Gravatar for user avatars.


