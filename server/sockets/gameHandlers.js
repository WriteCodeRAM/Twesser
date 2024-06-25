module.exports = (io, socket, rooms) => {
  socket.on("start_game", ({ room }) => {
    console.log(socket.id);
    console.log(rooms[room]);
    console.log(`Attempting to start game in room: ${room}`); //if user is host start game
    const host = rooms[room].members.filter((member) => member.host === true);

    if (host[0].id !== socket.id) {
      socket.emit("host_must_start_game");
    } else if (rooms[room] && rooms[room].members.length > 1) {
      // Your logic here
      console.log("game started");
      // emit listener to client
      io.emit("game_started");
      // sound effect is possible
      // show on lobby screen a countdown
      // during the countdown I want to fetch the tweets from db
      // once countdown is finished show first blurred tweet
    } else {
      console.log(`Game requires at least 2 people to play.`);
      socket.emit("player_count_warning");
    }
  });
};
