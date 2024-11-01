import React from "react";
import AnswerChoices from "./AnswerChoices";
import Image from "next/image";
import { Question, LobbyScreenProps } from "../../src/types/index";
import Leaderboard from "./Leaderboard";
import Countdown from "./Countdown";
import { useGetScores } from "../app/hooks/useGetScores";

const LobbyScreen = ({
  error,
  data,
  gameStarted,
  roundStarted,
  roundOver,
  intermission,
  room,
  handleTimerUpdate,
  gameOver,
}: LobbyScreenProps) => {
  const scores = useGetScores();
  const renderWaiting = () => (
    <div className="rounded-lg bg-white p-6 text-center shadow-lg">
      {error ? (
        <h1 className="text-xl font-semibold text-muted-red">{error}</h1>
      ) : (
        <h1 className="text-xl font-semibold">
          Waiting on host to start game{" "}
          <span className="text-muted-red"> (2 player min)</span>
        </h1>
      )}
    </div>
  );

  const renderRoundStarted = (data: Question) => (
    <div className="w-full">
      <Countdown
        text="Time Remaining: "
        handleTimerUpdate={handleTimerUpdate}
        initialTimer={20}
      >
        {(currentTimer) => (
          <>
            <Image
              className="mb-2 h-[250px] w-[700px] rounded border-4 border-muted-blue"
              src={data.blurredURL}
              width={700}
              height={250}
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
        className="mb-2 h-[250px] w-[700px] rounded border-4 border-muted-green"
        src={data.unblurredURL}
        width={700}
        height={250}
        alt="unblurred image"
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
        <Countdown
          text="Next round in: "
          handleTimerUpdate={handleTimerUpdate}
          initialTimer={10}
        >
          {() => (
            <Leaderboard members={scores} room={room} gameOver={gameOver} />
          )}
        </Countdown>
      </div>
    </div>
  );

  const renderGameEnded = () => (
    <div className="rounded-lg bg-black p-4 text-center shadow-lg">
      {error && <p className="font-madimi text-muted-red">{error}</p>}
      <Leaderboard members={scores} room={room} gameOver={gameOver} />
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
