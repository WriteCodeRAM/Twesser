"use client";
import React, { useState, useEffect } from "react";
import * as io from "socket.io-client";
import Button from "@/components/Button";
import Lobby from "@/components/Lobby";

const socket = io.connect("http://localhost:8080");

const JoinRoom: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [inRoom, setInRoom] = useState<boolean>(false);

  useEffect(() => {
    socket.on("roomCreated", (newRoomCode: string) => {
      console.log(`Room created with code: ${newRoomCode}`);
      setRoom(newRoomCode);
      setInRoom(true);
    });

    socket.on("invalid room code", () => {
      alert("Invalid room code. Please try again.");
      setInRoom(false);
    });

    // clean up the event listener when the component unmounts
    return () => {
      socket.off("roomCreated");
      socket.off("invalid room code");
    };
  }, []);

  const handleCreateRoom = (e: any) => {
    e.preventDefault();
    if (username) {
      socket.emit("createRoom");
    } else {
      alert("Please enter a username.");
    }
  };

  const handleJoinRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    if (username && room) {
      socket.emit("join_room", { room, username });
      setInRoom(true);
    }
  };

  return (
    <div className="bg-black p-16 rounded-lg">
      {!inRoom ? (
        <form className="flex justify-center flex-col align-middle gap-4">
          <h1 className="text-center text-white font-roboto font-bold text-2xl">
            Username
          </h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Enter username"
            className="p-4 border border-rounded rounded-lg text-center"
          />
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-center text-white font-roboto font-bold text-2xl">
                Join Room
              </h1>
              <input
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                type="text"
                placeholder="room code"
                className="p-4 border border-rounded rounded-lg text-center mb-2"
              />
              <Button
                onClick={handleJoinRoom}
                borderColor="soft-orange"
                text="Join"
                bgColor="bg-vibrant-teal"
              />
            </div>
            <h1 className="text-soft-orange text-2xl font-bold text-center">
              OR
            </h1>
            <div className="text-center">
              <h1 className="text-center text-white font-roboto font-bold text-2xl">
                Create Room
              </h1>
              <Button
                onClick={handleCreateRoom}
                bgColor="bg-soft-orange"
                borderColor="vibrant-teal"
                text="Create Room"
              />
            </div>
          </div>
        </form>
      ) : (
        <Lobby socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default JoinRoom;
