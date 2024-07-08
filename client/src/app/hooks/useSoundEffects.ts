import { useState, useEffect } from "react";
import { socket } from "../socket";

export const useSoundEffects = () => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const countdown = new Audio("/audio/countdown.mp3");
    const roundStart = new Audio("/audio/start_round.ogg");
    const roundMusic = new Audio("/audio/round_music.wav");
    const endRound = new Audio("/audio/end_round.wav");

    const handleGameStart = () => {
      countdown.play();
      setTimeout(() => {
        countdown.pause();
        roundStart.play();
        setGameStarted(true);
        handleRoundMusic();
      }, 5000);
    };

    const handleRoundMusic = () => {
      roundMusic.play();
      setTimeout(() => {
        roundMusic.pause();
        endRound.play();
      }, 15000);
    };

    socket.on("game_started", handleGameStart);

    return () => {
      socket.off("game_started", handleGameStart);
    };
  }, []);

  return { gameStarted };
};
