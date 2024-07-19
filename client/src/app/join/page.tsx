"use client";
import { useState } from "react";
import { useCreateRoom } from "../hooks/useCreateRoom";
import { useJoinRoom } from "../hooks/useJoinRoom";
import Button from "@/components/Button";
import Lobby from "@/components/Lobby";
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

  const handleCreateRoom = (e) => {
    e.preventDefault();
    createRoom(username);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    joinRoom(username, room);
  };

  // Conditional rendering based on whether the user is in the room
  if (!isInRoom && !inRoom) {
    return (
      <div className="relative rounded-lg bg-black p-16">
        <form className="flex flex-col justify-center gap-4 align-middle">
          {createError || joinError ? (
            <ErrorPage message={joinError || createError} />
          ) : null}
          <h1 className="text-center font-roboto text-2xl font-bold text-white">
            Username
          </h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            required
            value={username}
            type="text"
            placeholder="Enter username"
            className="border-rounded rounded-lg border p-4 text-center"
          />
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-center font-roboto text-2xl font-bold text-white">
                Join Room
              </h1>
              <input
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                type="text"
                placeholder="room code"
                className="border-rounded mb-2 rounded-lg border p-4 text-center"
              />
              <Button
                onClick={handleJoinRoom}
                borderColor="border-soft-orange"
                text="Join"
                bgColor="bg-vibrant-teal"
                type="button"
              />
            </div>
            <h1 className="p-4 text-center text-2xl font-bold text-soft-orange">
              OR
            </h1>
            <div className="text-center">
              <h1 className="text-center font-roboto text-2xl font-bold text-white">
                Create Room
              </h1>
              <Button
                onClick={handleCreateRoom}
                bgColor="bg-soft-orange"
                borderColor="border-vibrant-teal"
                text="Create Room"
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    // Render the Lobby component when the user is in the room
    return <Lobby room={room} />;
  }
};

export default RoomsForm;
