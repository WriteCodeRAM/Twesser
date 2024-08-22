import { useState, useEffect } from "react";
import { socket } from "../socket";

export const useCreateRoom = () => {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on("room_created", (newRoomCode) => {
      // setting room puts you in the lobby
      console.log(`room created with code: ${newRoomCode}`);
      // makes it so the Lobby component is displayed
      setRoom(newRoomCode);
      setIsLoading(false);
      setInRoom(true);
      setError("");
    });

    return () => {
      socket.off("room_created");
    };
  }, []);

  const createRoom = (username: string) => {
    if (username.trim() && username.length < 16) {
      setIsLoading(true);
      socket.emit("create_room", { username });
    } else if (username.length > 15) {
      setError("Username too long. (15 chars max)");
      setTimeout(() => {
        setError("");
      }, 1500);
    } else {
      setError("Enter a username first.");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  return { room, createRoom, inRoom, error, setRoom, isLoading };
};
