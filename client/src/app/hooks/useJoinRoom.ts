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
      setError("Invalid Room Code.");
      setInRoom(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    };

    const roomFull = () => {
      setError("Room is full.");
      setInRoom(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    };

    socket.on("roomJoined", roomJoined);
    socket.on("invalid_room_code", invalidRoomCode);
    socket.on("room_full", roomFull);

    return () => {
      socket.off("roomJoined", roomJoined);
      socket.off("invalid_room_code", invalidRoomCode);
      socket.off("room_full", roomFull);
    };
  }, []);

  const joinRoom = (username: string, room: string) => {
    if (username && room) {
      socket.emit("join_room", { username, room });
    } else {
      setError("Username and room code are required.");
    }
  };

  return { isInRoom, error, joinRoom };
};
