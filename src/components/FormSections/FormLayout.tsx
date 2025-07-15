import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { AppText } from "@components/Text";
import QuestionCard from "@components/FormSections/QuestionCard";
import Loader from "@components/ui/Loader";
import {
  BusinessContextQuestionDto,
  QuestionType,
  FormLayoutProps,
} from "+types";

export default function FormLayout<
  ContextType,
  QType extends BusinessContextQuestionDto = BusinessContextQuestionDto
>({
  context,
  setContext,
  questions,
  calculateProgress,
  sections,
  handleSubmit,
}: FormLayoutProps<ContextType, QType>) {
  const [activeSection, setActiveSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    calculateProgress(context);
  }, [context, calculateProgress]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestion && currentQuestion.section) {
      const currentSection = sections.find(
        (section) => section.key === currentQuestion.section
      );
      if (currentSection) {
        setActiveSection(sections.indexOf(currentSection));
      }
    }
  }, [currentQuestion, sections]);

  if (typeof questions === "undefined") {
    return <Loader text="Loading questions..." height="180px" />;
  }

  // Group questions by section
  const questionsBySection: Record<string, QType[]> = {};
  sections.forEach((section) => {
    questionsBySection[section.key] = questions.filter(
      (q) => q.section === section.key
    );
  });

  return (
    <Flex gap="3rem" width="100%" mt="3rem">
      <Flex flexDirection="column" gap="8px" width="20%">
        {sections.map((section, index) => (
          <Flex
            borderRadius="8px"
            alignItems="center"
            justifyContent="space-between"
            bg={activeSection === index ? "#F7F7F2" : "transparent"}
            p="8px"
            key={index}
            onClick={() => {
              setActiveSection(index);
              const firstQuestionInSection = questions.findIndex(
                (q) => q.section === section.key
              );
              if (firstQuestionInSection !== -1) {
                setCurrentQuestionIndex(firstQuestionInSection);
              }
            }}
            cursor="pointer"
          >
            <AppText fontSize="1.4rem">{section.section}</AppText>
            <AppText fontSize="1.2rem">{section.percentage}%</AppText>
          </Flex>
        ))}
      </Flex>
      <Flex flex={1} alignItems="center" justifyContent="center">
        {sections.map((section, index) =>
          activeSection === index ? (
            questionsBySection[section.key] &&
            questionsBySection[section.key].length > 0 ? (
              <QuestionCard
                key={section.key + "-question-card"}
                questionIndex={currentQuestionIndex}
                section={currentQuestion?.section || ""}
                question={currentQuestion?.question || ""}
                questionType={
                  (currentQuestion?.questionType as QuestionType) ??
                  QuestionType.SINGLE_CHOICE
                }
                options={(currentQuestion?.options as string[]) || []}
                booleanChoiceInstruction={
                  currentQuestion?.booleanTypeInstructions
                }
                setContext={setContext}
                context={context}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                questionKey={currentQuestion?.key || ""}
                totalQuestions={questions.length}
                handleSubmit={handleSubmit}
              />
            ) : (
              <Flex
                key={section.key + "-empty-card"}
                width="100%"
                maxWidth="600px"
                minHeight="220px"
                borderRadius="12px"
                border="1.5px dashed #F0EFE5"
                bg="#F7F7F2"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap="1.2rem"
              >
                <AppText fontSize="1.6rem" color="#B0ADA9" fontWeight={500}>
                  Questions will appear here
                </AppText>
                <AppText fontSize="1.2rem" color="#B0ADA9">
                  Sorry, We couldn&apos;'t fetch questions at the moment.
                </AppText>
              </Flex>
            )
          ) : null
        )}
      </Flex>
    </Flex>
  );
}
