module.exports = (io, socket, rooms) => {
  socket.on("start_game", ({ room }) => {
    console.log(`Attempting to start game in room: ${room}`);
    if (rooms[room] && rooms[room].members.length > 1) {
      // Your logic here
      console.log("game started");
      // emit listener to client
      // sound effect is possible
      // show on lobby screen a countdown
      // during the countdown I want to fetch the tweets from db
      // once countdown is finished show first blurred tweet
    } else {
      console.log(`Game requires at least 2 people to play.`);
    }
  });
};
