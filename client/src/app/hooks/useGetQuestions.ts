import { useState, useEffect } from "react";
import { socket } from "../socket";
import { Question } from "../../types";

export const useGetQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit("get_questions");

    socket.on("receive_questions", (receivedQuestions) => {
      setIndex(0);
      setQuestions(receivedQuestions);
      setLoading(false);
    });

    socket.on("game_ended", () => {
      setTimeout(() => {
        setIndex(0);
        setQuestions([]);
        setLoading(true);
      }, 5000);
    });

    return () => {
      socket.off("receive_questions");
    };
  }, []);

  useEffect(() => {
    const handleIncrementIndex = (newIndex: number) => {
      setIndex(newIndex);
    };

    socket.on("increment_index", handleIncrementIndex);

    return () => {
      socket.off("increment_index", handleIncrementIndex);
    };
  }, []);

  return { questions, index, loading };
};
