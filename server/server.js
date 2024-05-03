const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = {};
//listen to event = io.on

//connection = when user connects to server
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("createRoom", () => {
    const newRoomCode = generateUniqueRoomCode();
    // create new room w/ members arr
    rooms[newRoomCode] = { members: [] };
    socket.join(newRoomCode);
    socket.emit("roomCreated", newRoomCode);
  });

  socket.on("join_room", ({ room, username }) => {
    if (rooms[room] && rooms[room].members.length < 6) {
      // obj has both the socket ID and username
      rooms[room].members.push({ id: socket.id, name: username });
      socket.join(room);
      //  update all clients in the room with the new list of users
      io.to(room).emit(
        "updateRoom",
        rooms[room].members.map((member) => member.name)
      );
    } else {
      socket.emit("invalid room code");
    }
  });

  socket.on("disconnect", () => {
    // find the room and remove the member
    Object.keys(rooms).forEach((room) => {
      rooms[room].members = rooms[room].members.filter(
        (member) => member.id !== socket.id
      );
      if (rooms[room].members.length === 0) {
        delete rooms[room];
      } else {
        io.to(room).emit(
          "updateRoom",
          rooms[room].members.map((member) => member.name)
        );
      }
    });
  });
});

const generateUniqueRoomCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.ceil(Math.random() * 9);
  }
  return code;
};

httpServer.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
