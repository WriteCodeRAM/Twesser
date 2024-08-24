const { point_system, getMultiplier } = require("../utils/points");
const {
  incrementRoundIndex,
  resetRoom,
  startNewRound,
} = require("../utils/gameUtils");

module.exports = (io, socket, rooms, fetchNewQuestions) => {
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
      // reset room on play again
      if (rooms[room].gameEnded) {
        resetRoom(rooms, room);
      }

      // if room questions empty (after reset room for playing again) fetch questions and set it for room
      if (!rooms[room].questions.length) {
        for (let i = 0; i < rooms[room].members.length; i++) {
          rooms[room].members[i].score = 0;
        }

        const questions = await fetchNewQuestions(room, rooms);
        rooms[room].questions = questions;

        // add questions to history of room preventing duplicate questions on multiple playthroughs
        for (let i = 0; i < questions.length; i++) {
          rooms[room].history.push(questions[i].id);
        }
        // -> (useGetQuestions)
        io.to(room).emit("receive_questions", questions);
      }

      // -> (useGameFlow)
      if (rooms[room].questions.length) {
        io.to(room).emit("game_started");
      }
    } else {
      // -> (useGameRules) game must have 2 players to start
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
    if (rooms[room] && !rooms[room].gameEnded) {
      incrementRoundIndex(rooms, room);
      const sortedMembers = rooms[room].members.sort(
        (a, b) => b.score - a.score
      );
      io.to(room).emit("updated_scores", sortedMembers);
      rooms[room].placement = [];
      rooms[room].responses = [];

      const host = rooms[room].members.find((member) => member.host);
      // only allow host to emit game_ended and call startnewround
      if (socket.id === host.id) {
        if (rooms[room].currentIndex >= rooms[room].questions.length - 1) {
          console.log("Game ended. All questions answered.");
          rooms[room].gameEnded = true;
          io.to(room).emit("game_ended");
        } else {
          setTimeout(() => {
            if (!rooms[room].gameEnded) {
              startNewRound(io, rooms, room);
            }
          }, 15000);
        }
      }
    }
  });
};
