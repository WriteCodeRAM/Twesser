const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

//listen to event = io.on

//connection = when user connects to server
io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.emit('hello', 'world');
});

httpServer.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
