import React from "react";
import AnswerChoices from "./AnswerChoices";
import Image from "next/image";
import { Question } from "@/types";
import { LobbyScreenProps } from "@/types";
import Leaderboard from "./Leaderboard";
import Countdown from "./Countdown";
import { useGetScores } from "@/app/hooks/useGetScores";
import Button from "./Button";
import { socket } from "@/app/socket";

const LobbyScreen = ({
  error,
  data,
  gameStarted,
  roundStarted,
  roundOver,
  intermission,
  room,
  handleTimerUpdate,
  timer,
  gameOver,
}: LobbyScreenProps) => {
  const scores = useGetScores();
  const renderWaiting = () => (
    <div className="rounded-lg bg-white p-6 text-center shadow-lg">
      {error ? (
        <h1 className="text-xl font-semibold text-muted-red">{error}</h1>
      ) : (
        <h1 className="text-xl font-semibold">Waiting on host to start game</h1>
      )}
    </div>
  );

  const renderRoundStarted = (data: Question) => (
    <div className="w-full">
      <Countdown handleTimerUpdate={handleTimerUpdate} initialTimer={20}>
        {(currentTimer) => (
          <>
            <Image
              className="mb-2 w-full rounded border-2 border-muted-blue"
              src={data.blurredURL}
              width={800}
              height={350}
              alt="Blurred image"
              priority={true}
            />
            <AnswerChoices
              room={room}
              answer={data.answer}
              choices={data.answerChoices}
              timer={currentTimer}
            />
          </>
        )}
      </Countdown>
    </div>
  );

  const renderRoundOver = (data: Question) => (
    <div className="">
      <Image
        className="mb-2 rounded border-2 border-muted-green"
        src={data.unblurredURL}
        width={800}
        height={350}
        alt=""
        priority={true}
      />
      <h1 className="text-center font-madimi text-xl font-semibold">
        {data.answer}
      </h1>
    </div>
  );

  const renderIntermission = () => (
    <div className="flex flex-col gap-2">
      <div className="">
        <Countdown handleTimerUpdate={handleTimerUpdate} initialTimer={10}>
          {() => <Leaderboard members={scores} />}
        </Countdown>
      </div>
    </div>
  );

  const renderGameEnded = () => (
    <div className="rounded-lg bg-black p-4 text-center shadow-lg">
      <h1 className="font-madimi text-xl font-semibold text-light-blue">
        Game Over!
      </h1>
      {error && <p className="font-madimi text-muted-red">{error}</p>}
      <Leaderboard members={scores} />
      <Button
        onClick={() => socket.emit("start_game", { room })}
        bgColor="bg-soft-orange"
        borderColor="border-vibrant-teal"
        text="Play Again?"
        type="button"
      />
    </div>
  );

  return (
    <div className="size-full">
      {!gameStarted && !gameOver ? (
        renderWaiting()
      ) : (
        <div className="flex flex-col justify-center gap-4 align-middle">
          {roundStarted && data && renderRoundStarted(data)}
          {roundOver && data && renderRoundOver(data)}
          {intermission && renderIntermission()}
          {gameOver && renderGameEnded()}
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
