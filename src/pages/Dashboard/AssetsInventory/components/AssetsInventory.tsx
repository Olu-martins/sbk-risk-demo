import { Box, Flex } from "@chakra-ui/react";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { AppText } from "@components/Text";
import { useEffect, useState } from "react";
import QuestionCard from "@components/FormSections/QuestionCard";
import { AssetsInventoryKeys, AssetsInventoryQuestionDto } from "+types";
import {
  useGetAssetsQuery,
  useGetAssetsQuestionsQuery,
} from "@api/features/assetsInventory.api";
import { useNavigate } from "react-router-dom";
import { createEmptyAssetContext } from "@utils/assetsUtils";

const sections = [
  { section: "Software", key: "Software" },
  { section: "Engineering", key: "Engineering" },
  { section: "Databases", key: "Databases" },
  { section: "Financial", key: "Financial" },
  { section: "Customer Service", key: "CustomerService" },
  { section: "IT & Infrastructure", key: "ITInfrastructure" },
  { section: "Legal & Contractual", key: "Legal" },
  { section: "Other Platforms", key: "OtherPlatforms" },
];

const AssetsInventory = () => {
  const { data: assets } = useGetAssetsQuery();
  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useGetAssetsQuestionsQuery();
  const [context, setContext] = useState<AssetsInventoryKeys>(
    createEmptyAssetContext()
  );
  const [activeSection, setActiveSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<AssetsInventoryQuestionDto | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (assets?.data) {
      setContext(assets.data.context);
    }
  }, [assets]);

  useEffect(() => {
    if (questions?.data && questions.data.length > 0) {
      setCurrentQuestion(questions.data[currentQuestionIndex]);
    } else {
      setCurrentQuestion(null);
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestion) {
      const currentSection = sections.find(
        (section) => section.key === currentQuestion.section
      );
      if (currentSection) {
        setActiveSection(sections.indexOf(currentSection));
      }
    }
  }, [currentQuestion]);

  const handleSubmit = async () => {
    navigate("/dashboard/assets-inventory/preview", { state: { context } });
  };

  if (isQuestionsLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="40vh">
        <AppText>Loading questions...</AppText>
      </Flex>
    );
  }
  if (isQuestionsError) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="40vh">
        <AppText color="red.500">
          Failed to load questions. Please try again.
        </AppText>
      </Flex>
    );
  }
  if (!questions?.data || questions.data.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="40vh">
        <AppText>No questions available for asset inventory.</AppText>
      </Flex>
    );
  }

  return (
    <Flex
      flexDirection="column"
      borderRadius="16px"
      gap="16px"
      width="100%"
      mx="auto"
    >
      <Flex gap="12px" flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="1.2rem">
            <Box>
              <MdOutlineStoreMallDirectory color="#2A180E" size="24px" />
            </Box>
            <AppText fontWeight="500" fontSize="2rem">
              Assets Inventory
            </AppText>
          </Flex>
          <AppText
            fontWeight="500"
            pb="0rem"
            borderBottom="2px solid #2A180E"
            fontSize="1.6rem"
            cursor="pointer"
          >
            I'll finish this later
          </AppText>
        </Flex>
      </Flex>
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
              onClick={() => setActiveSection(index)}
              cursor="pointer"
            >
              <AppText fontSize="1.4rem">{section.section}</AppText>
            </Flex>
          ))}
        </Flex>
        {currentQuestion && (
          <QuestionCard
            questionIndex={currentQuestionIndex}
            section={currentQuestion.section}
            question={currentQuestion.question}
            questionType={currentQuestion.questionType}
            options={currentQuestion.options as string[]}
            booleanChoiceInstruction={currentQuestion.booleanTypeInstructions}
            setContext={setContext}
            context={context}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            questionKey={currentQuestion.key || ""}
            totalQuestions={questions?.data?.length || 0}
            handleSubmit={handleSubmit}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default AssetsInventory;
