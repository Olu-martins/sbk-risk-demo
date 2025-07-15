import { QuestionType } from "./api-types";

export interface IQuestionCardProps<T> {
  questionIndex: number;
  section: string;
  question: string;
  questionType: QuestionType;
  options: string[];
  booleanChoiceInstruction?: string;
  setContext: (context: T) => void;
  context: T;
  setCurrentQuestionIndex: (index: number) => void;
  questionKey: string;
  totalQuestions: number;
  handleSubmit: () => void;
}
