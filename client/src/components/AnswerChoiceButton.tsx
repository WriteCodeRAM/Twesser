import { AnswerChoicesButtonProps } from "@/types";

// take disable prop use that to disable buttons onClick
function AnswerChoicesButton({
  name,
  onClick,
  color,
  disabled,
}: AnswerChoicesButtonProps) {
  return (
    <button
      className={`rounded border-2 p-8 font-madimi transition-opacity duration-100 hover:text-light-blue hover:opacity-90 ${color} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export default AnswerChoicesButton;
