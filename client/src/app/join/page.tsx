"use client";
import React, { useState } from "react";
import { useCreateRoom } from "../hooks/useCreateRoom";
import { socket } from "../socket";
import Button from "@/components/Button";
import Lobby from "@/components/Lobby";
import { useJoinRoom } from "../hooks/useJoinRoom";
import ErrorPage from "@/components/Error";

const RoomsForm = () => {
  const [username, setUsername] = useState("");
  const {
    room,
    createRoom,
    error: createError,
    inRoom,
    setRoom,
  } = useCreateRoom();
  const { isInRoom, error: joinError, joinRoom } = useJoinRoom();

  const handleCreateRoom = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    createRoom(username);
  };

  const handleJoinRoom = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    joinRoom(username, room);
  };

  return (
    <div className="bg-black p-16 rounded-lg">
      {!isInRoom && !inRoom ? (
        <form className="flex justify-center flex-col align-middle gap-4">
          {createError || joinError ? (
            <ErrorPage message={createError || joinError} />
          ) : (
            ""
          )}
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
                type="button"
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
                type="button"
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

export default RoomsForm;
