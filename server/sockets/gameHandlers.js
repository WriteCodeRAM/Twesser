const { point_system, getMultiplier } = require("../utils/points");

module.exports = (io, socket, rooms, fetchNewQuestions) => {
  function incrementRoundIndex(room) {
    if (!rooms[room].indexIncrementedThisRound) {
      rooms[room].currentIndex++;
      rooms[room].indexIncrementedThisRound = true;
    }
  }

  function resetRoom(room) {
    rooms[room].currentIndex = 0;
    rooms[room].indexIncrementedThisRound = false;
    rooms[room].questions = [];
    rooms[room].gameEnded = false;
  }

  function startNewRound(room) {
    rooms[room].indexIncrementedThisRound = false;
    io.to(room).emit("increment_index", rooms[room].currentIndex);
    io.to(room).emit("start_next_round");
  }

  socket.on("start_game", async ({ room }) => {
    // find host
    const host = rooms[room].members.filter((member) => member.host === true);
    // dont allow regular members to start game
    if (host[0].id !== socket.id) {
      socket.emit("host_must_start_game");
      // dont allow room to play again once all questions in database have been answered
    } else if (rooms[room].history.length >= rooms[room].totalQuestions) {
      io.to(room).emit("all_questions_seen");
    } else if (
      host[0].id === socket.id &&
      rooms[room] &&
      rooms[room].members.length > 1
    ) {
      rooms[room].indexIncrementedThisRound = false;
      // if room questions empty fetch and set it for room
      // emit receieve_questions to room
      // valid play again condition
      if (!rooms[room].questions.length) {
        for (let i = 0; i < rooms[room].members.length; i++) {
          rooms[room].members[i].score = 0;
        }

        const questions = await fetchNewQuestions(room, rooms);

        rooms[room].questions = questions;
        for (let i = 0; i < questions.length; i++) {
          rooms[room].history.push(questions[i].id);
        }

        io.to(room).emit("receive_questions", questions);
      }

      if (rooms[room].questions.length) {
        io.to(room).emit("game_started");
      }
    } else {
      console.log(`Game requires at least 2 people to play.`);
      socket.emit("player_count_warning");
    }
  });

  socket.on("submit_answer", ({ room, choice, answer, timer }) => {
    rooms[room].responses.push(socket.id);
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

  socket.on("end_round", (room) => {
    if (rooms[room]) {
      const sortedMembers = rooms[room].members.sort(
        (a, b) => b.score - a.score
      );
      io.to(room).emit("updated_scores", sortedMembers);
      rooms[room].placement = [];
      rooms[room].responses = [];

      incrementRoundIndex(room);
      if (rooms[room].currentIndex < rooms[room].questions.length) {
        setTimeout(() => {
          if (!rooms[room].gameEnded) {
            startNewRound(room);
          }
        }, 15000);
      } else {
        console.log("Game ended. All questions answered.");
        rooms[room].gameEnded = true;
        io.to(room).emit("game_ended");
        resetRoom(room);
      }
    }
  });
};
