import { useState, useEffect } from "react";
import { socket } from "../socket";
import { Member } from "../../types";

export const useGetScores = (): Member[] => {
  const [scores, setScores] = useState<Member[]>([]);

  useEffect(() => {
    const handleUpdatedScores = (newScores: Member[]) => {
      setScores(newScores);
    };

    socket.on("updated_scores", handleUpdatedScores);

    return () => {
      socket.off("updated_scores", handleUpdatedScores);
    };
  }, []);

  return scores;
};
