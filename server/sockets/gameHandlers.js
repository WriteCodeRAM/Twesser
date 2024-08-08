const { point_system, getMultiplier } = require("../utils/points");

module.exports = (io, socket, rooms) => {
  socket.on("start_game", ({ room }) => {
    // find host
    const host = rooms[room].members.filter((member) => member.host === true);
    // dont allow regular members to start game
    if (host[0].id !== socket.id) {
      socket.emit("host_must_start_game");
    } else if (rooms[room] && rooms[room].members.length > 1) {
      // emit listener to room
      rooms[room].indexIncrementedThisRound = false;
      io.to(room).emit("game_started");

      rooms[room].gameStarted = true;
    } else {
      console.log(`Game requires at least 2 people to play.`);
      socket.emit("player_count_warning");
    }
  });

  socket.on("submit_answer", ({ room, choice, answer, timer }) => {
    rooms[room].responses.push(socket.id);
    console.log(timer);
    if (rooms[room]) {
      const isCorrect = choice === answer;

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
      if (rooms[room].responses.length == rooms[room].members.length) {
        // end round early
        io.to(room).emit("all_answers_submitted");
      }
    } else {
      console.log(`Room ${room} not found`);
    }
  });

  function incrementRoundIndex(room) {
    if (!rooms[room].indexIncrementedThisRound) {
      rooms[room].currentIndex++;
      rooms[room].indexIncrementedThisRound = true;
    }
  }

  function startNewRound(room) {
    rooms[room].indexIncrementedThisRound = false;
    io.to(room).emit("increment_index", rooms[room].currentIndex);
    io.to(room).emit("start_next_round");
  }

  socket.on("end_round", (room) => {
    if (rooms[room]) {
      const sortedMembers = rooms[room].members.sort(
        (a, b) => b.score - a.score
      );
      io.to(room).emit("updated_scores", sortedMembers);
      rooms[room].placement = [];
      rooms[room].responses = [];

      incrementRoundIndex(room);
      console.log(rooms[room].currentIndex);
      if (rooms[room].currentIndex < rooms[room].questions.length - 1) {
        console.log(
          `Preparing for next round. Current index: ${rooms[room].currentIndex}`
        );

        setTimeout(() => {
          startNewRound(room);
        }, 15000);
      } else {
        console.log("Game ended. All questions answered.");
        io.to(room).emit("game_ended");
      }
    }
  });

  socket.on("game_ended", (room) => {
    if (rooms[room]) {
      rooms[room].gameStarted = false;
      io.to(room).emit("game_ended");
      console.log("game over");
    }
  });
};
