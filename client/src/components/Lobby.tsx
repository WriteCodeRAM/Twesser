import LobbyMembers from "./LobbyMembers";
import LobbyScreen from "./LobbyScreen";
import { useGetMembers } from "@/app/hooks/useGetMembers";
import { useEffect } from "react";

interface LobbyProps {
  room: string;
}

const Lobby = ({ room }: LobbyProps) => {
  // const [members, setMembers] = useState([]);
  const { members } = useGetMembers(room);

  useEffect(() => {
    console.log("component mounted");
    console.log(room);
  }, [members]);
  return (
    <div className="flex flex-col align-middle justify-center">
      <p className="text-center">Code: {room}</p>
      <LobbyScreen />
      <LobbyMembers members={members}></LobbyMembers>
    </div>
  );
};

export default Lobby;
