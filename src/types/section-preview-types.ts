export interface Section {
  section: string;
  key: string;
}

export interface Question {
  key: string;
  section: string;
  question: string;
}

export interface SectionedPreviewProps<ContextType, QuestionType extends Question> {
  icon: React.ReactNode;
  title: string;
  sections: Section[];
  questions: QuestionType[];
  context: ContextType;
  getAnswer: (context: ContextType, question: QuestionType) => React.ReactNode;
}
