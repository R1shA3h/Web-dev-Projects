const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/video_conferencing_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Set secret key for JWT
const secretKey = 'your-secret-key';

// Middleware for user authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Register user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Room schema and model
const roomSchema = new mongoose.Schema({
  name: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Room = mongoose.model('Room', roomSchema);

// Create a new room
app.post('/rooms', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const room = new Room({ name, participants: [req.user.username] });
    await room.save();
    res.status(201).json({ message: 'Room created successfully', roomId: room._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all rooms
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().populate('participants', 'username');
    res.json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join room
  socket.on('join', async (data) => {
    const { roomId, token } = data;
    try {
      const decoded = jwt.verify(token, secretKey);
      const user = await User.findOne({ username: decoded.username });
      const room = await Room.findById(roomId);
      if (!user || !room || !room.participants.includes(user._id)) {
        return socket.emit('error', { message: 'You are not authorized to join this room' });
      }
      socket.join(roomId);
      console.log(`Client ${user.username} joined room: ${room.name}`);
      socket.to(roomId).emit('userJoined', user.username);
    } catch (error) {
      console.error(error);
      socket.emit('error', { message: 'Authentication failed' });
    }
  });

  // Leave room
  socket.on('leave', (roomId) => {
    socket.leave(roomId);
    console.log(`Client left room: ${roomId}`);
    socket.to(roomId).emit('userLeft', socket.id);
  });

  // Video stream
  socket.on('stream', (data) => {
    const { roomId, stream } = data;
    socket.to(roomId).emit('stream', { socketId: socket.id, stream });
  });

  // Chat messages
  socket.on('chat', (data) => {
    const { roomId, message } = data;
    socket.to(roomId).emit('chat', { socketId: socket.id, message });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // ...
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
