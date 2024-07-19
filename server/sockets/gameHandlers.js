module.exports = (io, socket, rooms) => {
  socket.on("start_game", ({ room }) => {
    // find host
    const host = rooms[room].members.filter((member) => member.host === true);
    // dont allow regular members to start game
    if (host[0].id !== socket.id) {
      socket.emit("host_must_start_game");
    } else if (rooms[room] && rooms[room].members.length > 1) {
      console.log("game started");
      // emit listener to room
      io.to(room).emit("game_started");
    } else {
      console.log(`Game requires at least 2 people to play.`);
      socket.emit("player_count_warning");
    }
  });
  socket.on("end_round", (room) => {
    io.to(room).emit("increment_index");
  });
};
