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
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
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

    socket.on("host_must_start_game", () => {
      setError("Only the host of the room is allowed to start the game.");
      setTimeout(() => {
        setError("");
      }, 2000);
    });

    socket.on("game_started", () => {
      const countdown = new Audio("/audio/countdown.mp3");
      const roundStart = new Audio("/audio/start_round.ogg");
      setError("Game starting...");
      countdown.play();
      setTimeout(() => {
        countdown.pause();
        roundStart.play();
        setGameStarted(true);
      }, 5000);
    });

    fetchQuestions();
  }, [room]);

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
      <LobbyScreen questions={questions} error={error} />
      {!gameStarted && (
        <LobbyMembers members={members} room={room} img={"lol"} />
      )}
    </div>
  );
};

export default Lobby;
