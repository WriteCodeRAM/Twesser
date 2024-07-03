import { useState, useEffect } from "react";
import { socket } from "../socket";

export const useSoundEffects = () => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleGameStart = () => {
      const countdown = new Audio("/audio/countdown.mp3");
      const roundStart = new Audio("/audio/start_round.ogg");
      countdown.play();
      setTimeout(() => {
        countdown.pause();
        roundStart.play();
        setGameStarted(true);
      }, 5000);
    };

    socket.on("game_started", handleGameStart);

    return () => {
      socket.off("game_started", handleGameStart);
    };
  }, []);

  return { gameStarted };
};
