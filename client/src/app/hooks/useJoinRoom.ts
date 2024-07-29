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

    const roomInGame = () => {
      setError("Room already in game.");
      setInRoom(false);
      setTimeout(() => {
        setError("");
      }, 1500);
    };

    socket.on("room_joined", roomJoined);
    socket.on("invalid_room_code", invalidRoomCode);
    socket.on("room_full", roomFull);
    socket.on("game_has_started", roomInGame);

    return () => {
      socket.off("room_joined", roomJoined);
      socket.off("invalid_room_code", invalidRoomCode);
      socket.off("room_full", roomFull);
    };
  }, []);

  const joinRoom = (username: string, room: string) => {
    if (username && room && username.length < 16) {
      socket.emit("join_room", { username, room });
    } else if (username.length > 15) {
      setError("Username too long. (15 chars max)");
      setTimeout(() => {
        setError("");
      }, 1500);
    } else {
      setError("Username and room code are required.");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  return { isInRoom, error, joinRoom };
};
