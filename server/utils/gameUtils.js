function incrementRoundIndex(rooms, room) {
  if (
    !rooms[room].indexIncrementedThisRound &&
    rooms[room].currentIndex < rooms[room].questions.length - 1
  ) {
    rooms[room].currentIndex++;
    rooms[room].indexIncrementedThisRound = true;
  }
}

function resetRoom(rooms, room) {
  rooms[room].currentIndex = 0;
  rooms[room].indexIncrementedThisRound = false;
  rooms[room].questions = [];
  rooms[room].gameEnded = false;
}

function startNewRound(io, rooms, room) {
  if (!rooms[room].gameEnded) {
    rooms[room].indexIncrementedThisRound = false;
    io.to(room).emit("increment_index", rooms[room].currentIndex);
    io.to(room).emit("start_next_round");
  }
}

module.exports = {
  incrementRoundIndex,
  resetRoom,
  startNewRound,
};
