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
      <div className="bg-black p-16 rounded-lg relative">
        <form className="flex justify-center flex-col align-middle gap-4">
          {createError || joinError ? (
            <ErrorPage message={joinError || createError} />
          ) : null}
          <h1 className="text-center text-white font-roboto font-bold text-2xl">
            Username
          </h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            required
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
            <h1 className="text-soft-orange text-2xl font-bold text-center p-4">
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
      </div>
    );
  } else {
    // Render the Lobby component when the user is in the room
    return <Lobby room={room} />;
  }
};

export default RoomsForm;
