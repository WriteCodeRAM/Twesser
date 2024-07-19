import LobbyMembers from "./LobbyMembers";
import LobbyScreen from "./LobbyScreen";
import { useGetMembers } from "@/app/hooks/useGetMembers";
import { useGetQuestions } from "@/app/hooks/useGetQuestions";
import { useSoundEffects } from "@/app/hooks/useSoundEffects";
import { useGameRules } from "@/app/hooks/useGameRules";

interface LobbyProps {
  room: string;
}

const Lobby = ({ room }: LobbyProps) => {
  const { members } = useGetMembers(room);
  const { questions, index } = useGetQuestions();
  const { gameStarted, roundStarted, roundOver, intermission } =
    useSoundEffects(room);
  const { error } = useGameRules();

  if (!room) {
    return <p>Loading room details...</p>;
  }

  return (
    <div className="flex flex-col justify-center align-middle">
      <div
        className="text-center hover:cursor-pointer hover:text-white"
        onClick={() => {
          navigator.clipboard.writeText(room);
        }}
      >
        <p>Code: {room}</p>
      </div>
      <LobbyScreen
        error={error}
        data={questions[index] || null}
        gameStarted={gameStarted}
        roundStarted={roundStarted}
        roundOver={roundOver}
        intermission={intermission}
      />
      {!gameStarted && <LobbyMembers members={members} room={room} />}
    </div>
  );
};

export default Lobby;
