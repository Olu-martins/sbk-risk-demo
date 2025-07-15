export interface FormSection {
  section: string;
  key: string;
  percentage: number;
}

export interface FormLayoutProps<ContextType, QuestionType> {
  context: ContextType;
  setContext: (context: ContextType) => void;
  questions: QuestionType[];
  calculateProgress: (context: ContextType) => { sections: Record<string, number> };
  sections: FormSection[];
  handleSubmit: () => void;
}
