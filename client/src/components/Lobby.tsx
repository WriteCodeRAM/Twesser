import React, { useState } from "react";
import LobbyMembers from "./LobbyMembers";
import LobbyScreen from "./LobbyScreen";
import { useGetMembers } from "../app/hooks/useGetMembers";
import { useGetQuestions } from "../app/hooks/useGetQuestions";
import { useGameFlow } from "../app/hooks/useGameFlow";
import { useGameRules } from "../app/hooks/useGameRules";

interface LobbyProps {
  room: string;
}

const Lobby = ({ room }: LobbyProps) => {
  const { members } = useGetMembers(room);
  const { questions, index } = useGetQuestions();
  const {
    gameStarted,
    roundStarted,
    roundOver,
    intermission,
    handleTimerUpdate,
    timer,
    gameOver,
  } = useGameFlow(room);
  const { error } = useGameRules();
  const [copied, setCopied] = useState(false);

  if (!room) {
    return <p>Loading room details...</p>;
  }

  function handleCopy() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col justify-center align-middle">
      {!gameStarted && (
        <div
          className="text-center hover:cursor-pointer hover:text-white"
          onClick={() => {
            navigator.clipboard.writeText(room);
          }}
        >
          {copied ? (
            <p className="font-madimi text-muted-green">code copied</p>
          ) : (
            <p onClick={handleCopy} className="font-madimi font-bold">
              code: {room}
            </p>
          )}
        </div>
      )}
      <LobbyScreen
        error={error}
        data={questions[index] || null}
        gameStarted={gameStarted}
        roundStarted={roundStarted}
        roundOver={roundOver}
        intermission={intermission}
        room={room}
        handleTimerUpdate={handleTimerUpdate}
        timer={timer}
        gameOver={gameOver}
      />
      {!gameStarted && !gameOver && (
        <LobbyMembers members={members} room={room} error={error} />
      )}
    </div>
  );
};

export default Lobby;
