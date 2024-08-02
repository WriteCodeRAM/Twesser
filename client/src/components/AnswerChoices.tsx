import AnswerChoiceButton from "./AnswerChoiceButton";
import { socket } from "@/app/socket";
import { useState, useEffect, useContext } from "react";
import { useSoundEffects } from "@/app/hooks/useSoundEffects";
import { AnswerChoicesProps } from "@/types";
import { CountdownContext } from "./Countdown";

const colors: string[] = [
  "border-soft-orange bg-vibrant-teal",
  "border-vibrant-teal bg-soft-orange",
  "border-muted-purple bg-muted-blue",
  "border-muted-blue bg-muted-purple",
];
const AnswerChoices = ({ choices, answer, room }: AnswerChoicesProps) => {
  const [disabled, setDisabled] = useState(false);
  const { submitSound } = useSoundEffects(room);
  const timer = useContext(CountdownContext);

  useEffect(() => {
    socket.on("play_submit_sound", () => {
      if (submitSound.current) submitSound.current.play();
    });

    return () => {
      socket.off("play_submit_sound");
    };
  }, [submitSound]);

  function answerSubmission(choice: string) {
    if (submitSound.current) submitSound.current.play();
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
