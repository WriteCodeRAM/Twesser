import LobbyMembers from "./LobbyMembers";
import LobbyScreen from "./LobbyScreen";
import { useGetMembers } from "@/app/hooks/useGetMembers";
import { useEffect } from "react";

interface LobbyProps {
  room: string;
}

const Lobby = ({ room }: LobbyProps) => {
  const { members } = useGetMembers(room);

  useEffect(() => {
    console.log("Lobby component mounted");
    console.log("Room code in Lobby:", room);
  }, [room, members]);

  if (!room) {
    return <p>Loading room details...</p>; // or any other loading state representation
  }

  return (
    <div className="flex flex-col align-middle justify-center">
      <p className="text-center">Code: {room}</p>
      <LobbyScreen />
      <LobbyMembers members={members} room={room} />
    </div>
  );
};

export default Lobby;
