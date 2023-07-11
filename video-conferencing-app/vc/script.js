// Declare variables
let localStream;
let remoteStream;
let peerConnection;
let roomName;

// Get DOM elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const joinButton = document.getElementById('joinButton');
const createButton = document.getElementById('createButton');
const roomInput = document.getElementById('roomInput');
const errorMessage = document.getElementById('errorMessage');

// Add event listeners
startButton.addEventListener('click', startCall);
endButton.addEventListener('click', endCall);
joinButton.addEventListener('click', joinRoom);
createButton.addEventListener('click', createRoom);

// Function to start the call
function startCall() {
  // Check if room is specified
  if (!roomName) {
    showError('Please join or create a room first.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      localStream = stream;
      localVideo.srcObject = localStream;

      // Create peer connection
     createPeerConnection();

      // Add local stream to peer connection
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    })
    .catch(error => {
      console.error('Error accessing media devices:', error);
      showError('Error accessing media devices. Please check your camera and microphone settings.');
    });
}

// Function to end the call
function endCall() {
  localStream.getTracks().forEach(track => track.stop());
  if (remoteStream) {
    remoteStream.getTracks().forEach(track => track.stop());
  }
  if (peerConnection) {
    peerConnection.close();
  }
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
}

// Function to join a room
function joinRoom() {
  // Reset error message
  resetError();

  roomName = roomInput.value.trim();

  // Check if room name is empty
  if (roomName === '') {
    showError('Please enter a room name.');
    return;
  }

  // Establish WebSocket connection with the signaling server
  const ws = new WebSocket('ws://localhost:8080');
  ws.onopen = () => {
    const message = { type: 'join', room: roomName };
    ws.send(JSON.stringify(message));
  };
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    handleSignalingMessage(message);
  };
}

// Function to create a room
function createRoom() {
  // Reset error message
  resetError();

  roomName = roomInput.value.trim();

  // Check if room name is empty
  if (roomName === '') {
    showError('Please enter a room name.');
    return;
  }

  // Establish WebSocket connection with the signaling server
  const ws = new WebSocket('ws://localhost:8080');
  ws.onopen = () => {
    const message = { type: 'create', room: roomName };
    ws.send(JSON.stringify(message));
  };
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    handleSignalingMessage(message);
  };
}

// Function to handle incoming signaling messages
function handleSignalingMessage(message) {
  // Add your signaling message handling code here
  // This code provides a basic example for handling offer and answer messages

  switch (message.type) {
    case 'join':
      handleJoinMessage(message);
      break;
    case 'create':
      handleCreateMessage(message);
      break;
    case 'offer':
      handleOfferMessage(message);
      break;
    case 'answer':
      handleAnswerMessage(message);
      break;
    case 'candidate':
      handleCandidateMessage(message);
      break;
    default:
      console.warn('Unknown signaling message type:', message.type);
  }
}

// Function to handle join message
function handleJoinMessage(message) {
  // Check if peer connection already exists
  if (peerConnection) {
    showError('You are already connected to a room.');
    return;
  }

  // Create peer connection
  createPeerConnection();

  // Set offerer as the remote description
  const offerer = message.offerer;
  peerConnection.setRemoteDescription(new RTCSessionDescription(offerer))
    .then(() => {
      // Add local stream to peer connection
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

      // Create answer
      return peerConnection.createAnswer();
    })
    .then(answer => {
      // Set local description
      return peerConnection.setLocalDescription(answer);
    })
    .then(() => {
      // Send answer to offerer
      const answerer = { type: 'answer', answer: peerConnection.localDescription };
      const response = {type: 'answer', offerer: offerer.clientId, answerer };
      sendSignalingMessage(response);
    })
    .catch(error => {
      console.error('Error handling join message:', error);
      showError('Error joining the room.');
    });
}

// Function to handle create message
function handleCreateMessage(message) {
  // Check if peer connection already exists
  if (peerConnection) {
    showError('You are already connected to a room.');
    return;
  }

  // Create peer connection
  createPeerConnection();

  // Set offerer as the remote description
  const offerer = message.offerer;
  peerConnection.setRemoteDescription(new RTCSessionDescription(offerer))
    .then(() => {
      // Add local stream to peer connection
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

      // Create answer
      return peerConnection.createAnswer();
    })
    .then(answer => {
      // Set local description
      return peerConnection.setLocalDescription(answer);
    })
    .then(() => {
      // Send answer to offerer
      const answerer = { type: 'answer', answer: peerConnection.localDescription };
      const response = { type: 'answer', offerer: offerer.clientId, answerer };
      sendSignalingMessage(response);
    })
    .catch(error => {
      console.error('Error handling create message:', error);
      showError('Error creating the room.');
    });
}

// Function to handle offer message
function handleOfferMessage(message) {
  // Check if peer connection already exists
  if (peerConnection) {
    showError('You are already connected to a room.');
    return;
  }

  // Create peer connection
  createPeerConnection();

  // Set offerer as the remote description
  const offerer = message.offerer;
  peerConnection.setRemoteDescription(new RTCSessionDescription(offerer))
    .then(() => {
      // Add local stream to peer connection
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

      // Create answer
      return peerConnection.createAnswer();
    })
    .then(answer => {
      // Set local description
      return peerConnection.setLocalDescription(answer);
    })
    .then(() => {
      // Send answer to offerer
      const answerer = { type: 'answer', answer: peerConnection.localDescription };
      const response = { type: 'answer', offerer: offerer.clientId, answerer };
      sendSignalingMessage(response);
    })
    .catch(error => {
      console.error('Error handling offer message:', error);
      showError('Error handling the offer.');
    });
}

// Function to handle answer message
function handleAnswerMessage(message) {
  // Check if peer connection exists
  if (!peerConnection) {
    showError('You are not connected to a room.');
    return;
  }

  // Set answerer as the remote description
  const answerer = message.answerer;
  peerConnection.setRemoteDescription(new RTCSessionDescription(answerer))
    .catch(error => {
      console.error('Error handling answer message:', error);
      showError('Error handling the answer.');
    });
}

// Function to handle ICE candidate message
function handleCandidateMessage(message) {
  // Check if peer connection exists
  if (!peerConnection) {
    showError('You are not connected to a room.');
    return;
  }

  // Add ICE candidate to peer connection
  const candidate = message.candidate;
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
    .catch(error => {
      console.error('Error handling ICE candidate message:', error);
      showError('Error handling the ICE candidate.');
    });
}

// Function to send signalingmessage
function sendSignalingMessage(message) {
  // Check if WebSocket connection is open
  if (ws.readyState !== WebSocket.OPEN) {
    showError('Signaling server connection is not established.');
    return;
  }

  // Send the signaling message to the signaling server
  ws.send(JSON.stringify(message));
}

// Function to create a new peer connection
function createPeerConnection() {
  // Add your custom ICE servers here
  const iceServers = [
    { urls: 'stun:stun.example.com' },
    { urls: 'turn:turn.example.com', username: 'username', credential: 'password' }
  ];

  const configuration = { iceServers };

  try {
    peerConnection = new RTCPeerConnection(configuration);

    // Add event handlers for ICE negotiation and stream handling
    peerConnection.onicecandidate = handleICECandidate;
    peerConnection.ontrack = handleTrack;
  } catch (error) {
    console.error('Error creating peer connection:', error);
    showError('Error creating the peer connection.');
  }
}

// Function to handle ICE candidates
function handleICECandidate(event) {
  if (event.candidate) {
    const message = { type: 'candidate', candidate: event.candidate };
    sendSignalingMessage(message);
  }
}

// Function to handle incoming tracks
function handleTrack(event) {
  remoteStream = event.streams[0];
  remoteVideo.srcObject = remoteStream;
}

// Function to show error message
function showError(message) {
  errorMessage.textContent = message;
}

// Function to reset error message
function resetError() {
  errorMessage.textContent = '';
}
