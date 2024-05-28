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
      }, 1000);
    };

    const roomFull = () => {
      setError("Room is full.");
      setInRoom(false);
      setTimeout(() => {
        setError("");
      }, 1000);
    };

    socket.on("room_joined", roomJoined);
    socket.on("invalid_room_code", invalidRoomCode);
    socket.on("room_full", roomFull);

    return () => {
      socket.off("room_joined", roomJoined);
      socket.off("invalid_room_code", invalidRoomCode);
      socket.off("room_full", roomFull);
    };
  }, []);

  const joinRoom = (username: string, room: string) => {
    if (username && room) {
      socket.emit("join_room", { username, room });
    } else {
      setError("Username and room code are required.");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  return { isInRoom, error, joinRoom };
};
