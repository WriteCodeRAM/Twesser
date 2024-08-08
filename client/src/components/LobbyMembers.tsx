import { socket } from "@/app/socket";
import { useState } from "react";
import { LobbyMembersProps } from "@/types";

const LobbyMembers = ({ members, room }: LobbyMembersProps) => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    socket.emit("start_game", { room });
  };

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {members.map((member, index) => (
        <div
          className="w-48 rounded bg-black p-4 text-center font-madimi text-white"
          key={index}
        >
          {member.name}
          {member.host && !gameStarted ? (
            <button
              onClick={handleStartGame}
              className="ml-2 rounded bg-white p-1 text-black"
            >
              Start Game
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default LobbyMembers;
