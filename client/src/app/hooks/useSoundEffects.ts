import { useRef, useEffect, useCallback } from "react";
import { socket } from "../socket";

export const useSoundEffects = () => {
  const countdown = useRef<HTMLAudioElement | null>(null);
  const roundStart = useRef<HTMLAudioElement | null>(null);
  const roundMusic = useRef<HTMLAudioElement | null>(null);
  const endRoundMusic = useRef<HTMLAudioElement | null>(null);
  const submitSound = useRef<HTMLAudioElement | null>(null);
  const joinedSound = useRef<HTMLAudioElement | null>(null);
  const leftSound = useRef<HTMLAudioElement | null>(null);
  const gameOver = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    countdown.current = new Audio("/audio/countdown.mp3");
    roundStart.current = new Audio("/audio/start_round.ogg");
    roundMusic.current = new Audio("/audio/round_music.wav");
    endRoundMusic.current = new Audio("/audio/end_round.wav");
    submitSound.current = new Audio("/audio/submit.wav");
    joinedSound.current = new Audio("/audio/joined_room.wav");
    leftSound.current = new Audio("/audio/left_room.flac");
    gameOver.current = new Audio("/audio/game_over.mp3");

    socket.on("play_submit_sound", () => {
      playSubmitSound();
    });
  }, []);

  const playCountdown = useCallback(() => {
    if (countdown.current) {
      countdown.current.currentTime = 0;
      countdown.current.volume = 0.05;
      countdown.current.play();
    }
  }, []);

  const stopCountdown = useCallback(() => {
    if (countdown.current) {
      countdown.current.pause();
      countdown.current.currentTime = 0;
    }
  }, []);

  const playRoundStart = useCallback(() => {
    if (roundStart.current) {
      roundStart.current.currentTime = 0;
      roundStart.current.volume = 0.05;
      roundStart.current.play();
    }
  }, []);

  const playRoundMusic = useCallback(() => {
    if (roundMusic.current) {
      roundMusic.current.currentTime = 0;
      roundMusic.current.volume = 0.05;
      roundMusic.current.play();
    }
  }, []);

  const stopRoundMusic = useCallback(() => {
    if (roundMusic.current) {
      roundMusic.current.pause();
      roundMusic.current.currentTime = 0;
    }
  }, []);

  const playEndRoundMusic = useCallback(() => {
    if (endRoundMusic.current) {
      endRoundMusic.current.currentTime = 0;
      endRoundMusic.current.volume = 0.05;
      endRoundMusic.current.play();
    }
  }, []);

  const playSubmitSound = useCallback(() => {
    if (submitSound.current) {
      submitSound.current.currentTime = 0;
      submitSound.current.volume = 0.05;
      submitSound.current.play();
    }
  }, []);

  const playJoinedSound = useCallback(() => {
    if (joinedSound.current) {
      joinedSound.current.volume = 0.05;
      joinedSound.current.play();
    }
  }, []);

  const playLeftSound = useCallback(() => {
    if (leftSound.current) {
      leftSound.current.volume = 0.05;
      leftSound.current.play();
    }
  }, []);

  const playGameOver = useCallback(() => {
    if (gameOver.current) {
      gameOver.current.volume = 0.05;
      gameOver.current.play();
    }
  }, []);
  return {
    playCountdown,
    stopCountdown,
    playRoundStart,
    playRoundMusic,
    stopRoundMusic,
    playEndRoundMusic,
    playSubmitSound,
    playJoinedSound,
    playLeftSound,
    playGameOver,
  };
};
