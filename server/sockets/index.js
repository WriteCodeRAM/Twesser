const { Server } = require("socket.io");
const roomHandlers = require("./roomHandlers");
const gameHandlers = require("./gameHandlers");
const { fetchNewQuestions } = require("../utils/questions");

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

    roomHandlers(io, socket, rooms, fetchNewQuestions);
    gameHandlers(io, socket, rooms, fetchNewQuestions);

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
          io.to(room).emit("update_room", rooms[room].members);
        }
      });
    });
  });

  return { io, fetchNewQuestions };
};
