export interface LobbyMemberFields {
  id: string;
  name: string;
  host: boolean;
  score: number;
}

export interface LobbyMembersProps {
  members: LobbyMemberFields[];
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
  error: string;
  data: Question | null;
  gameStarted: boolean;
  roundStarted: boolean;
  roundOver: boolean;
  intermission: boolean;
  room: string;
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
}

export interface CountdownProps {
  time: number;
}
