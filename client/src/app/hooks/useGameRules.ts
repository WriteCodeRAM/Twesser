import { useState, useEffect } from "react";
import { socket } from "../socket";

export const useGameRules = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    const handlePlayerCountWarning = () => {
      setError("Game requires at least 2 players to start.");
      setTimeout(() => {
        setError("");
      }, 2000);
    };

    const handleHostMustStartGame = () => {
      setError("The host must start the game.");
      setTimeout(() => {
        setError("");
      }, 2000);
    };

    const handleGameStarting = () => {
      setError("Game starting...");
      setTimeout(() => {
        setError("");
      }, 5000);
    };

    socket.on("player_count_warning", handlePlayerCountWarning);
    socket.on("host_must_start_game", handleHostMustStartGame);
    socket.on("game_started", handleGameStarting);

    return () => {
      socket.off("player_count_warning", handlePlayerCountWarning);
      socket.off("host_must_start_game", handleHostMustStartGame);
    };
  }, []);

  return { error };
};
