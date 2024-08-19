import { useState, useEffect } from "react";
import { socket } from "../socket";
import { LobbyMemberFields } from "@/types";

export const useGetScores = (): LobbyMemberFields[] => {
  const [scores, setScores] = useState<LobbyMemberFields[]>([]);

  useEffect(() => {
    const handleUpdatedScores = (newScores: LobbyMemberFields[]) => {
      setScores(newScores);
    };

    socket.on("updated_scores", handleUpdatedScores);

    return () => {
      socket.off("updated_scores", handleUpdatedScores);
    };
  }, []);

  return scores;
};
