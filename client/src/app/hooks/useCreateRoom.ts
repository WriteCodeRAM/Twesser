import { useState, useEffect } from "react";
import { socket } from "../socket";

export const useCreateRoom = () => {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const [inRoom, setInRoom] = useState(false);

  useEffect(() => {
    socket.on("room_created", (newRoomCode) => {
      // setting room puts you in the lobby
      console.log('room created' + room)
      setRoom(newRoomCode);
      setError("");
    });

    return () => {
      socket.off("room_created");
    };
  }, []);

  const createRoom = (username: string) => {
    // console.log(username);
    if (username.trim()) {
      const newName = username.trim();
      // newName doesnt work for some reason ?
      // console.log(newName);
      socket.emit("create_room", { username });
      setInRoom(true);
    } else {
      setError("Enter a username first.");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  return { room, createRoom, error, inRoom, setRoom };
};
