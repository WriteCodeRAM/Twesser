import React from "react";
import AnswerChoices from "./AnswerChoices";
import Image from "next/image";
import Leaderboard from "./Leaderboard";
import Countdown from "./Countdown";

type Question = {
  id: number;
  answerChoices: string[];
  blurredURL: string;
  unblurredURL: string;
  answer: string;
};

interface LobbyScreenProps {
  error: string;
  data: Question | null;
  gameStarted: boolean;
  roundStarted: boolean;
  roundOver: boolean;
  intermission: boolean;
}

const LobbyScreen = ({
  error,
  data,
  gameStarted,
  roundStarted,
  roundOver,
  intermission,
}: LobbyScreenProps) => {
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
    <div className="image-container">
      <Countdown time={15}></Countdown>
      <Image
        src={data.blurredURL}
        width={800}
        height={350}
        alt=""
        priority={true}
      />
      <AnswerChoices choices={data.answerChoices} />
    </div>
  );

  const renderRoundOver = (data: Question) => (
    <div className="image-container">
      <Image
        src={data.unblurredURL}
        width={800}
        height={350}
        alt=""
        priority={true}
      />
      <h1 className="text-center text-xl font-semibold">{data.answer}</h1>
    </div>
  );

  const renderIntermission = () => (
    <div className="flex gap-2">
      <Leaderboard />
      <p className="font-madimi font-bold text-soft-orange">Next round in:</p>
      <Countdown time={10}></Countdown>
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
