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
  // members attached to event listeners, updates when user joins / leaves
  const { members } = useGetMembers(room);
  const { questions, index } = useGetQuestions();
  const { gameStarted } = useSoundEffects();
  const { error } = useGameRules();

  if (!room) {
    return <p>Loading room details...</p>;
  }

  return (
    <div className="flex flex-col align-middle justify-center">
      <div
        className="text-center hover:cursor-pointer hover:text-white"
        onClick={() => {
          navigator.clipboard.writeText(room);
        }}
      >
        <p>Code: {room}</p>
      </div>
      <LobbyScreen error={error} img={questions[index]?.blurredURL || null} />
      {!gameStarted && <LobbyMembers members={members} room={room} />}
    </div>
  );
};

export default Lobby;
