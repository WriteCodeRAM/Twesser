import React from "react";
import AnswerChoices from "./AnswerChoices";
import Image from "next/image";
import { Question } from "@/types";
import { LobbyScreenProps } from "@/types";
import Leaderboard from "./Leaderboard";
import Countdown from "./Countdown";
import { useGetScores } from "@/app/hooks/useGetScores";

const LobbyScreen = ({
  error,
  data,
  gameStarted,
  roundStarted,
  roundOver,
  intermission,
  room,
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
      <Countdown time={20}>
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
          />
        </>
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
        <Countdown time={10}>
          <Leaderboard members={scores} />
        </Countdown>
      </div>
    </div>
  );

  return (
    <div className="size-full">
      {!gameStarted ? (
        renderWaiting()
      ) : (
        <div className="flex flex-col justify-center gap-4 align-middle">
          {roundStarted && data && renderRoundStarted(data)}
          {roundOver && data && renderRoundOver(data)}
          {intermission && renderIntermission()}
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
