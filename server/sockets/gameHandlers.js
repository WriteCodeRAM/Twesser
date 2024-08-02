const { point_system, getMultiplier } = require("../utils/points");

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
      rooms[room].gameStarted = true;
    } else {
      console.log(`Game requires at least 2 people to play.`);
      socket.emit("player_count_warning");
    }
  });

  socket.on("submit_answer", ({ room, choice, answer, timer }) => {
    if (rooms[room]) {
      const isCorrect = choice === answer;
      console.log(timer);
      const userIndex = rooms[room].members.findIndex(
        (member) => member.id === socket.id
      );
      if (userIndex !== -1) {
        if (isCorrect) {
          const multiplier = getMultiplier(timer);

          rooms[room].members[userIndex].score +=
            point_system[rooms[room].placement.length] * multiplier;
          rooms[room].placement.push([
            rooms[room].members[userIndex].name,
            rooms[room].members[userIndex].score,
          ]);
        }
      }

      io.to(room).emit("play_submit_sound");
    } else {
      console.log(`Room ${room} not found`);
    }
  });

  socket.on("end_round", (room) => {
    const sortedMembers = rooms[room].members.sort((a, b) => b.score - a.score);

    io.to(room).emit("updated_scores", sortedMembers);
    rooms[room].placement = [];
  });

  socket.on("next_round", (room) => {
    io.to(room).emit("increment_index");
  });
};
