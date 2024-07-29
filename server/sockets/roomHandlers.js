const generateUniqueRoomCode = require("../utils/generateCode");

module.exports = (io, socket, rooms) => {
  socket.on("create_room", ({ username }) => {
    const newRoomCode = generateUniqueRoomCode();
    rooms[newRoomCode] = {
      members: [{ id: socket.id, name: username, host: true, score: 0 }],
      gameStarted: false,
      placement: [],
    };
    socket.join(newRoomCode);
    socket.emit("room_created", newRoomCode);
    io.to(newRoomCode).emit("update_room", rooms[newRoomCode].members);
  });

  socket.on("join_room", ({ room, username }) => {
    if (
      rooms[room] &&
      rooms[room].members.length < 6 &&
      !rooms[room].gameStarted
    ) {
      rooms[room].members.push({
        id: socket.id,
        name: username,
        host: false,
        score: 0,
      });
      socket.join(room);
      socket.emit("room_joined");
      //  update all clients in the room with the new list of users
      io.to(room).emit("update_room", rooms[room].members);
    } else if (!rooms[room]) {
      socket.emit("invalid_room_code");
    } else if (rooms[room].gameStarted) {
      socket.emit("game_has_started");
    } else {
      socket.emit("room_full");
    }
  });
};
