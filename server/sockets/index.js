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
      Object.keys(rooms).forEach((roomCode) => {
        const room = rooms[roomCode];
        const memberIndex = room.members.findIndex(
          (member) => member.id === socket.id
        );
        if (memberIndex !== -1) {
          room.members.splice(memberIndex, 1);
          if (room.members.length === 0) {
            delete rooms[roomCode];
          } else {
            io.to(roomCode).emit(
              "member_disconnected",
              socket.id,
              room.members
            );
          }
        }
      });
    });
  });

  return { io, fetchNewQuestions };
};
