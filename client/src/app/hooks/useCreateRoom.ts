import { useState, useEffect } from "react";
import { socket } from "../socket";

export const useCreateRoom = () => {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const [inRoom, setInRoom] = useState(false);

  useEffect(() => {
    socket.on("roomCreated", (newRoomCode) => {
      setRoom(newRoomCode);
      setError("");
    });

    return () => {
      socket.off("roomCreated");
    };
  }, []);

  const createRoom = (username: string) => {
    console.log(username);
    if (username.trim()) {
      const newName = username.trim();
      console.log(newName);
      socket.emit("createRoom", { username });
      setInRoom(true);
    } else {
      setError("Enter a username first.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return { room, createRoom, error, inRoom, setRoom };
};
