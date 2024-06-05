const generateUniqueRoomCode = require("../utils/generateCode");

module.exports = (io, socket, rooms) => {
  socket.on("create_room", ({ username }) => {
    const newRoomCode = generateUniqueRoomCode();
    rooms[newRoomCode] = {
      members: [{ id: socket.id, name: username, host: true }],
    };
    console.log(`room created with code: ${newRoomCode}`);
    socket.join(newRoomCode);
    socket.emit("room_created", newRoomCode);
  });

  socket.on("join_room", ({ room, username }) => {
    if (rooms[room] && rooms[room].members.length < 6) {
      rooms[room].members.push({ id: socket.id, name: username });
      socket.join(room);
      //  update all clients in the room with the new list of users
      io.to(room).emit(
        "update_room",
        rooms[room].members
        // rooms[room].members.map((member) => member.name)
      );
      socket.emit("room_joined");
    } else if (!rooms[room]) {
      socket.emit("invalid_room_code");
    } else {
      socket.emit("room_full");
    }
  });
};
