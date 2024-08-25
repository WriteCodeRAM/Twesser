import AnswerChoiceButton from "./AnswerChoiceButton";
import { socket } from "../app/socket";
import { useState, useEffect } from "react";
import { useSoundEffects } from "../app/hooks/useSoundEffects";
import { AnswerChoicesProps } from "../../src/types/index";

const colors: string[] = [
  "border-soft-orange bg-vibrant-teal",
  "border-vibrant-teal bg-soft-orange",
  "border-muted-purple bg-muted-blue",
  "border-muted-blue bg-muted-purple",
];
const AnswerChoices = ({
  choices,
  answer,
  room,
  timer,
}: AnswerChoicesProps) => {
  const [disabled, setDisabled] = useState(false);
  const { playSubmitSound } = useSoundEffects();

  useEffect(() => {
    socket.on("play_submit_sound", () => {
      playSubmitSound();
    });

    return () => {
      socket.off("play_submit_sound");
    };
  }, []);

  function answerSubmission(choice: string) {
    playSubmitSound();
    setDisabled(true);
    socket.emit("submit_answer", { room, choice, answer, timer });
  }
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">
      {choices.map(function (choice, idx) {
        return (
          <AnswerChoiceButton
            key={idx}
            name={choice}
            onClick={() => answerSubmission(choice)}
            color={idx >= 2 ? (colors[idx] += " row-start-2") : colors[idx]}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};

export default AnswerChoices;
