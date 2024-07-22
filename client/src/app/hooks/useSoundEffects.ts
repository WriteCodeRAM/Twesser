import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";
import { count } from "console";

export const useSoundEffects = (room: string) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [intermission, setIntermission] = useState(false);

  const countdown = useRef<HTMLAudioElement | null>(null);
  const roundStart = useRef<HTMLAudioElement | null>(null);
  const roundMusic = useRef<HTMLAudioElement | null>(null);
  const endRound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    countdown.current = new Audio("/audio/countdown.mp3");
    roundStart.current = new Audio("/audio/start_round.ogg");
    roundMusic.current = new Audio("/audio/round_music.wav");
    endRound.current = new Audio("/audio/end_round.wav");

    const handleGameStart = () => {
      if (countdown.current) countdown.current.play();
      setTimeout(() => {
        if (countdown.current) {
          countdown.current.pause();
          countdown.current.currentTime = 0;
        }
        if (roundStart.current) {
          roundStart.current.currentTime = 0;
          roundStart.current.play();
        }
        setIntermission(false);
        setGameStarted(true);
        handleRoundMusic();
      }, 5000);
    };

    const handleRoundMusic = () => {
      setRoundStarted(true);
      if (roundMusic.current) {
        roundMusic.current.currentTime = 0;
        roundMusic.current.play();
      }
      setTimeout(() => {
        if (roundMusic.current) roundMusic.current.pause();
        if (endRound.current) endRound.current.play();
        setRoundOver(true);
        setRoundStarted(false);
        setTimeout(() => {
          showLeaderboard();
        }, 5000);
      }, 15000);
    };

    const showLeaderboard = () => {
      setRoundOver(false);
      setIntermission(true);
      setTimeout(() => {
        socket.emit("end_round", room);
        handleGameStart();
      }, 5000);
    };

    socket.on("game_started", handleGameStart);

    return () => {
      socket.off("game_started", handleGameStart);
    };
  }, [room]);

  return { gameStarted, roundStarted, roundOver, intermission };
};
