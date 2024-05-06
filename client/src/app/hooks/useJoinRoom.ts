// hooks/useJoinRoom.js
import { useState, useEffect } from "react";
import { socket } from "../socket";

export const useJoinRoom = () => {
  const [isInRoom, setInRoom] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const roomJoined = () => {
      setInRoom(true);
      setError("");
    };

    const invalidRoomCode = () => {
      setError("Invalid room code. Please try again.");
      setInRoom(false);
    };

    socket.on("roomJoined", roomJoined);
    socket.on("invalid room code", invalidRoomCode);

    return () => {
      socket.off("roomJoined", roomJoined);
      socket.off("invalid room code", invalidRoomCode);
    };
  }, []);

  const joinRoom = (username: string, room: string) => {
    if (username && room) {
      socket.emit("join_room", { username, room });
      setInRoom(true);
    } else {
      setError("Username and room code are required.");
    }
  };

  return { isInRoom, error, joinRoom };
};
