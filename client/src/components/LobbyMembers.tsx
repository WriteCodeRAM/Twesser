import { socket } from "@/app/socket";
import { useEffect, useState } from "react";

interface LobbyMemberFields {
  id: string;
  name: string;
}

interface LobbyMembersProps {
  members: LobbyMemberFields[];
  room: string;
}
//maybe emit event when host hits start game
// event makes lobby sfx  and screen says game starting in 5,4,3...
const LobbyMembers = ({ members, room }) => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    console.log(`Room in LobbyMembers at effect start: ${room}`);
  }, [room]);

  const handleStartGame = () => {
    socket.emit("start_game", { room });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {members.map((member, index) => (
        <div
          className="text-white font-madimi text-center bg-black p-4 rounded w-48"
          key={index}
        >
          {member.name}
          {member.host && !gameStarted ? (
            <button
              onClick={handleStartGame}
              className="ml-2 bg-white text-black rounded"
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
