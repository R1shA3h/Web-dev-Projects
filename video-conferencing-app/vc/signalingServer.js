const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients and room information
const clients = {};
const rooms = {};

// Function to broadcast a message to all clients in a room
function broadcast(room, message) {
  if (rooms[room]) {
    rooms[room].forEach(clientId => {
      if (clients[clientId].readyState === WebSocket.OPEN) {
        clients[clientId].send(JSON.stringify(message));
      }
    });
  }
}

wss.on('connection', ws => {
  let clientId;

  // Handle incoming messages from clients
  ws.on('message', message => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join':
        clientId = data.clientId;
        const room = data.room;

        // Add client to room
        if (!rooms[room]) {
          rooms[room] = [];
        }
        rooms[room].push(clientId);

        // Store client WebSocket connection
        clients[clientId] = ws;

        break;
      case 'offer':
      case 'answer':
      case 'candidate':
        // Broadcast signaling message to the recipient in the same room
        const recipient = data.recipient;
        const roomName = data.room;
        const broadcastMessage = { type: data.type, ...data.payload };

        broadcast(roomName, { recipient, ...broadcastMessage });

        break;
      default:
        console.warn('Unknown message type:', data.type);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    // Remove client from room and clients list
    if (clientId) {
      for (const room in rooms) {
        const index = rooms[room].indexOf(clientId);
        if (index !== -1) {
          rooms[room].splice(index, 1);
          break;
        }
      }
      delete clients[clientId];
    }
  });
});

console.log('Signaling server is running on port 8080');
// ...

// Function to create a room
function createRoom(roomName) {
    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }
  }
  
  wss.on('connection', ws => {
    let clientId;
  
    // ...
  
    ws.on('message', message => {
      const data = JSON.parse(message);
  
      switch (data.type) {
        case 'join':
          clientId = data.clientId;
          const room = data.room;
  
          // Create the room if it doesn't exist
          createRoom(room);
  
          // Add client to room
          rooms[room].push(clientId);
  
          // Store client WebSocket connection
          clients[clientId] = ws;
  
          break;
  
        // ...
      }
    });
  
    // ...
  });
  
  // ...
  