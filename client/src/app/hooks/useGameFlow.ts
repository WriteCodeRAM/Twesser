import { useState, useEffect, useCallback } from "react";
import { socket } from "../socket";
import { useSoundEffects } from "./useSoundEffects";

export const useGameFlow = (room: string, initialTimer?: number) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [intermission, setIntermission] = useState(false);
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(initialTimer || 0);

  const {
    playCountdown,
    stopCountdown,
    playRoundStart,
    playRoundMusic,
    stopRoundMusic,
    playEndRoundMusic,
  } = useSoundEffects();

  const startGame = useCallback(() => {
    if (round == 1) {
      playCountdown();
      setTimeout(() => {
        stopCountdown();
        setIntermission(false);
        playRoundStart();
        setGameStarted(true);
        setRoundStarted(true);
        playRoundMusic();
      }, 5000);
    } else {
      stopCountdown();
      setIntermission(false);
      playRoundStart();
      setRoundStarted(true);
      playRoundMusic();
    }
  }, [playRoundStart, playRoundMusic, round]);

  const endRound = useCallback(() => {
    setRound((prev) => prev + 1);
    setRoundStarted(false);
    setRoundOver(true);
    stopRoundMusic();
    stopCountdown();
    playEndRoundMusic();
    socket.emit("end_round", room);

    setTimeout(() => {
      setRoundOver(false);
      setIntermission(true);
    }, 5000);
  }, [stopRoundMusic, stopCountdown, playEndRoundMusic, room]);

  const handleTimerUpdate = useCallback(
    (newTimer: number) => {
      setTimer(newTimer);
      if (roundStarted) {
        if (newTimer === 5) {
          playCountdown();
        } else if (newTimer === 0) {
          endRound();
        }
      } else if (intermission) {
        if (newTimer === 5) {
          playCountdown();
        }
      }
    },
    [roundStarted, intermission, playCountdown, endRound],
  );

  useEffect(() => {
    socket.on("game_started", startGame);
    socket.on("all_answers_submitted", endRound);
    socket.on("start_next_round", startGame);
    socket.on("game_ended", () => {
      setGameStarted(false);
      setRoundStarted(false);
      setRoundOver(false);
      setIntermission(false);
      setRound(1);
    });

    return () => {
      socket.off("game_started", startGame);
      socket.off("all_answers_submitted", endRound);
      socket.off("start_next_round", startGame);
      socket.off("game_ended");
    };
  }, [startGame, endRound]);

  return {
    gameStarted,
    roundStarted,
    roundOver,
    intermission,
    handleTimerUpdate,
    timer,
  };
};
