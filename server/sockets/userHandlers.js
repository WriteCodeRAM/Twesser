module.exports = (io, socket, rooms) => {
  socket.on("get_members", (code) => {
    console.log(`code is : ${code}`);
    if (rooms[code]) {
      console.log("Members in room: ", rooms[code]);
      socket.emit("members_list", rooms[code].members);
    } else {
      console.log(`No such room exists with the provided code: ${code}`);
      socket.emit("error", "No such room exists");
    }
  });
};
