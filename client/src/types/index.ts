export interface LobbyMemberFields {
  id: string;
  name: string;
  host: boolean;
  score: number;
}

export interface LobbyMembersProps {
  members: LobbyMemberFields[];
  room: string;
  error: string;
}

export interface ButtonProps {
  text: string;
  borderColor: string;
  bgColor: string;
  onClick?: any;
  type: string;
}

export interface Question {
  id: number;
  answerChoices: string[];
  blurredURL: string;
  unblurredURL: string;
  answer: string;
}

export interface LobbyScreenProps {
  error: string | null;
  data: Question | null;
  gameStarted: boolean;
  roundStarted: boolean;
  roundOver: boolean;
  intermission: boolean;
  room: string;
  handleTimerUpdate: (newTimer: number) => void;
  timer: number;
  gameOver: boolean;
}

export interface AnswerChoicesButtonProps {
  name: string;
  onClick: () => void;
  color: string;
  disabled: boolean;
}

export interface AnswerChoicesProps {
  choices: string[];
  answer: string;
  room: string;
  timer: number;
}

export interface CountdownProps {}
