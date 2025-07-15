import { Question, Section as SectionType, SectionedPreviewProps } from "+types";
import { Box, Flex } from "@chakra-ui/react";
import { AppText } from "@components/Text";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export type Section = {
  section: string;
  key: string;
};

export function SectionedPreview<ContextType, QuestionType extends Question>({
  icon,
  title,
  sections,
  questions,
  context,
  getAnswer,
}: SectionedPreviewProps<ContextType, QuestionType>) {
  return (
    <Flex flexDirection="column" p="40px 40px 20px 40px" borderRadius="16px" gap="16px" width="90%" mx="auto">
      <Flex gap="6rem" flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="1.2rem">
            <Box>{icon}</Box>
            <AppText fontWeight="500" fontSize="2rem">
              {title}
            </AppText>
          </Flex>
        </Flex>
        {sections.map((section) => (
          <SectionCard
            key={section.key}
            section={section}
            questions={questions}
            context={context}
            getAnswer={getAnswer}
          />
        ))}
      </Flex>
    </Flex>
  );
}

function SectionCard<ContextType, QuestionType extends Question>({
  section,
  questions,
  context,
  getAnswer,
}: {
  section: SectionType;
  questions: QuestionType[];
  context: ContextType;
  getAnswer: (context: ContextType, question: QuestionType) => React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sectionQuestions = questions.filter((q) => q.section === section.key);
  return (
    <Box borderRadius="12px" border="1.5px solid #F0EFE5" p="2.4rem" bg="white" w="100%" mb="1.2rem">
      <Flex alignItems="center" justifyContent="space-between" style={{ cursor: 'pointer' }} onClick={() => setIsCollapsed((c) => !c)}>
        <AppText fontWeight="500" fontSize="1.4rem">{section.section}</AppText>
        <Flex gap="15px" alignItems="center">
          <AppText fontWeight="600" color="#FF662D">
            {isCollapsed ? 'Expand' : 'Collapse'}
          </AppText>
          {isCollapsed ? (
            <IoIosArrowDown color="#FF662D" size="20px" />
          ) : (
            <IoIosArrowUp color="#FF662D" size="20px" />
          )}
        </Flex>
      </Flex>
      {!isCollapsed && (
        <Flex flexDirection="column" gap="1.2rem" mt="1.2rem">
          {sectionQuestions.map((q, index) => (
            <Flex key={q.key} flexDirection="column" gap="0.4rem" borderBottom="1px solid #F0EFE5" pb="1.2rem">
              <Flex gap="0.8rem" alignItems="center">
                <AppText fontSize="1.2rem" color="#5A5654">
                  QUESTION {index + 1}
                </AppText>
                <AppText fontSize="1.2rem" fontWeight="600" color="#FF662D">
                  Answered
                </AppText>
              </Flex>
              <AppText fontWeight="500">{q.question}</AppText>
              <AppText color="#5A5654" fontSize="1.2rem">• {getAnswer(context, q)}</AppText>
            </Flex>
          ))}
        </Flex>
      )}
    </Box>
  );
}
