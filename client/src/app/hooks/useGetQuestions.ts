import { useState, useEffect } from "react";
import { socket } from "../socket";

type Question = {
  id: number;
  answerChoices: string[];
  blurredURL: string;
  unblurredURL: string;
  answer: string;
};

export const useGetQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.questions);
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    socket.on("increment_index", () => setIndex((prev) => prev + 1));
    return () => {
      socket.off("increment_index");
    };
  }, []);

  return { questions, index, loading };
};
