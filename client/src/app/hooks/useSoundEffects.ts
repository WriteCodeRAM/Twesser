import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";

export const useSoundEffects = (room: string) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [intermission, setIntermission] = useState(false);

  const countdown = useRef<HTMLAudioElement | null>(null);
  const roundStart = useRef<HTMLAudioElement | null>(null);
  const roundMusic = useRef<HTMLAudioElement | null>(null);
  const endRound = useRef<HTMLAudioElement | null>(null);
  const submitSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    countdown.current = new Audio("/audio/countdown.mp3");
    roundStart.current = new Audio("/audio/start_round.ogg");
    roundMusic.current = new Audio("/audio/round_music.wav");
    endRound.current = new Audio("/audio/end_round.wav");
    submitSound.current = new Audio("/audio/submit.wav");

    const handleGameStart = () => {
      if (countdown.current) {
        countdown.current.play();
        countdown.current.volume = 0.05;
      }
      setTimeout(() => {
        if (countdown.current) {
          countdown.current.pause();
          countdown.current.currentTime = 0;
        }
        if (roundStart.current) {
          roundStart.current.currentTime = 0;
          roundStart.current.volume = 0.05;
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
        roundMusic.current.volume = 0.05;
        roundMusic.current.play();
      }

      // plays countdown sound 10 seconds in (last 5 seconds) of a round
      setTimeout(() => {
        if (countdown.current) countdown.current.play();
      }, 10000);
      // runs after 15 seconds (round length)
      setTimeout(() => {
        if (roundMusic.current) roundMusic.current.pause();
        if (countdown.current) {
          countdown.current.pause();
          countdown.current.currentTime = 0;
        }
        if (endRound.current) {
          endRound.current.play();
          endRound.current.volume = 0.05;
          socket.emit("end_round", room);
        }
        setRoundOver(true);
        setRoundStarted(false);
        setTimeout(() => {
          showLeaderboard();
          socket.emit("next_round", room);
        }, 5000);
      }, 15000);
    };

    const showLeaderboard = () => {
      setRoundOver(false);
      setIntermission(true);
      setTimeout(() => {
        handleGameStart();
      }, 5000);
    };

    socket.on("game_started", handleGameStart);

    return () => {
      socket.off("game_started", handleGameStart);
    };
  }, [room]);

  return { gameStarted, roundStarted, roundOver, intermission, submitSound };
};
