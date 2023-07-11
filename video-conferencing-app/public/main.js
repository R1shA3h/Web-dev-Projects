const socket = io();

// DOM elements
const loginForm = document.getElementById('login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

const conferenceSection = document.getElementById('conference');
const participantsContainer = document.getElementById('participants');
const localVideo = document.getElementById('localVideo');
const remoteVideosContainer = document.getElementById('remoteVideos');
const chatMessagesContainer = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const leaveBtn = document.getElementById('leaveBtn');

let localStream;
const remoteStreams = {};

// User registration
loginBtn.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error(error);
      alert('Registration failed. Please try again.');
    });
});

// User login
loginBtn.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { token } = data;
      localStorage.setItem('token', token);
      loginForm.style.display = 'none';
      conferenceSection.style.display = 'block';
      const defaultRoomId = 'your-default-room-id';
      socket.emit('join', { roomId: defaultRoomId, token });
    })
    .catch((error) => {
      console.error(error);
      alert('Login failed. Please try again.');
    });
});

// Room creation
// Add HTML elements for creating a new room (e.g., room name input and create room button)
// Add event listener for the create room button
// In the event listener, send a POST request to the server to create a new room
// After creating the room, join the newly created room using socket.emit('join', { roomId, token })

// ... (Existing code)

// Leave room
leaveBtn.addEventListener('click', () => {
  const roomId = 'your-room-id';
  socket.emit('leave', roomId);
  localVideo.srcObject = null;
  Object.values(remoteStreams).forEach((stream) => {
    stream.getTracks().forEach((track) => track.stop());
  });
  remoteStreams = {};
  loginForm.style.display = 'block';
  conferenceSection.style.display = 'none';
});

// ... (Existing code)
