const { Server } = require("socket.io");
const roomHandlers = require("./roomHandlers");
const userHandlers = require("./userHandlers");
const gameHandlers = require("./gameHandlers");

const rooms = {};

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    roomHandlers(io, socket, rooms);
    userHandlers(io, socket, rooms);
    gameHandlers(io, socket, rooms);

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected `);
      // handle disconnect
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

  return io;
};
