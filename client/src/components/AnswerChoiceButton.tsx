interface AnswerChoicesButtonProps {
  name: string;
  onClick: () => void;
  color: string;
}

function AnswerChoicesButton(props: AnswerChoicesButtonProps) {
  return (
    <button
      className={`rounded border-2 p-8 font-madimi transition-opacity duration-100 hover:text-light-blue hover:opacity-90 ${props.color}`}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

export default AnswerChoicesButton;
