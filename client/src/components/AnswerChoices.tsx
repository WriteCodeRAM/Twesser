import AnswerChoiceButton from "./AnswerChoiceButton";

const colors: string[] = [
  "border-soft-orange bg-vibrant-teal",
  "border-vibrant-teal bg-soft-orange",
  "border-muted-purple bg-muted-blue",
  "border-muted-blue bg-muted-purple",
];

interface AnswerChoicesProps {
  choices: string[];
}

const AnswerChoices = ({ choices }: AnswerChoicesProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">
      {choices.map(function (choice, idx) {
        return (
          <AnswerChoiceButton
            key={idx}
            name={choice}
            onClick={() => console.log("clicked " + choice)}
            color={idx >= 2 ? (colors[idx] += " row-start-2") : colors[idx]}
          />
        );
      })}
    </div>
  );
};

export default AnswerChoices;
