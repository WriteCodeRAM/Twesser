import LobbyMembers from "./LobbyMembers";
import LobbyScreen from "./LobbyScreen";
import { useGetMembers } from "@/app/hooks/useGetMembers";
import { useEffect, useState } from "react";
import { socket } from "@/app/socket";

interface LobbyProps {
  room: string;
}

const Lobby = ({ room }: LobbyProps) => {
  const { members } = useGetMembers(room);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Lobby component mounted");
    console.log("Room code in Lobby:", room);

    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        console.log(data);
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    socket.on("player_count_warning", () => {
      setError("Game requires at least 2 players to start.");
      setTimeout(() => {
        setError("");
      }, 2000);
    });

    fetchQuestions();
  }, [room]);

  if (!room) {
    return <p>Loading room details...</p>;
  }

  return (
    <div className="flex flex-col align-middle justify-center">
      <p className="text-center">Code: {room}</p>
      <LobbyScreen questions={questions} error={error} />
      <LobbyMembers members={members} room={room} />
    </div>
  );
};

export default Lobby;
