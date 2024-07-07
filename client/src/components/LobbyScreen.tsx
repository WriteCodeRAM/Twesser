import { useGetQuestions } from "@/app/hooks/useGetQuestions";
import { useSoundEffects } from "@/app/hooks/useSoundEffects";
import Image from "next/image";

const LobbyScreen = ({ error, img }) => {
  const { gameStarted } = useSoundEffects();
  return (
    <div className="">
      {!gameStarted ? (
        <div className="bg-white h-64 text-center shadow-lg rounded-lg p-6">
          {error ? (
            <h1 className="text-xl font-semibold text-muted-red">{error}</h1>
          ) : (
            <h1 className="text-xl font-semibold">
              Waiting on host to start game
            </h1>
          )}
        </div>
      ) : (
        <div className="image-container">
          <Image src={img} width={800} height={350} alt="" />
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
