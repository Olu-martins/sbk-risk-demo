import { Flex, Box, Checkbox, RadioGroup, Input } from "@chakra-ui/react";
import { AppText } from "@components/Text";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { QuestionType, IQuestionCardProps } from "+types";

function QuestionCard<T>({
  questionIndex,
  section,
  question,
  questionKey,
  questionType,
  options,
  booleanChoiceInstruction,
  setContext,
  context,
  setCurrentQuestionIndex,
  totalQuestions,
  handleSubmit,
}: IQuestionCardProps<T>) {
  const [selectedBoolean, setSelectedBoolean] = useState<"yes" | "no">("yes");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // Reset states when question changes
  useEffect(() => {
    const contextKey = `${section}.${questionKey}`;
    const currentValue = context[contextKey as keyof typeof context] as string;

    if (currentValue && currentValue.trim() !== "") {
      const currentOptions = currentValue.split(",");
      let filteredOptions: string[] = [];
      let validOptions: string[] = [];
      let invalidOptions: string[] = [];

      switch (questionType) {
        case QuestionType.MULTIPLE_CHOICE:
          filteredOptions = options.filter((option) =>
            currentOptions.includes(option)
          );
          setSelectedOptions(filteredOptions);
          break;

        case QuestionType.SINGLE_CHOICE:
          setInputValue(currentValue);
          break;

        case QuestionType.MULTIPLE_CHOICE_WITH_INPUT:
        case QuestionType.SINGLE_CHOICE_WITH_INPUT:
          validOptions = options.filter((option) =>
            currentOptions.includes(option)
          );
          invalidOptions = currentOptions.filter(
            (option) => !options.includes(option)
          );
          setSelectedOptions(validOptions);
          setInputValue(invalidOptions.join(" "));
          break;

        case QuestionType.BOOLEAN_WITH_MULTIPLE_CHOICE:
          setSelectedBoolean(currentOptions[0] === "yes" ? "yes" : "no");
          filteredOptions = options.filter((option) =>
            currentOptions.includes(option)
          );
          setSelectedOptions(filteredOptions);
          break;

        default:
          break;
      }
    } else {
      // Reset states if no previous value exists
      setSelectedBoolean("yes");
      setSelectedOptions([]);
      setInputValue("");
    }
  }, [questionIndex, section, questionKey, context, questionType, options]);

  const handleNextQuestion = () => {
    const contextKey = `${section}.${questionKey}`;
    setContext({
      ...context,
      [contextKey]: getContextValue(),
    });
    if (questionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(questionIndex + 1);
    } else {
      setIsSubmit(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setCurrentQuestionIndex(questionIndex - 1);
    }
  };

  const getContextValue = () => {
    switch (questionType) {
      case QuestionType.SINGLE_CHOICE:
        return selectedOptions[0];

      case QuestionType.MULTIPLE_CHOICE:
        return selectedOptions.join(",");

      case QuestionType.BOOLEAN_WITH_MULTIPLE_CHOICE:
        return [selectedBoolean, ...selectedOptions].join(",");

      case QuestionType.MULTIPLE_CHOICE_WITH_INPUT:
      case QuestionType.SINGLE_CHOICE_WITH_INPUT:
        return [...selectedOptions, inputValue].join(",");

      default:
        return "";
    }
  };

  return (
    <Box
      borderRadius="12px"
      borderLeft="4px solid "
      borderRight="1.5px solid #F0EFE5"
      borderTop="1.5px solid #F0EFE5"
      borderBottom="1.5px solid #F0EFE5"
      borderLeftColor="#FF662D"
      p="2.4rem"
      bg="white"
      w="100%"
      display="flex"
      flexDirection="column"
      gap="2rem"
      alignItems="flex-start"
    >
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <Flex
          alignItems="center"
          p="4px 12px"
          borderRadius="16px"
          bgColor="#F7F7F2"
          gap="1.6rem"
        >
          <AppText color="#000000" fontWeight="500" fontSize="10px">
            Question {questionIndex + 1}
          </AppText>
        </Flex>
        <AppText color="#0F0905" fontSize="14px">
          {section}
        </AppText>
      </Flex>
      <Flex flexDirection="column" gap="2.4rem" w="100%">
        <Flex flexDirection="column" gap="1.2rem" w="100%">
          <Flex flexDirection="column" gap="1.6rem" w="100%">
            <AppText fontWeight="500">{question}</AppText>

            {questionType === QuestionType.BOOLEAN_WITH_MULTIPLE_CHOICE && (
              <Flex mx="auto" gap="2.4rem" alignItems="center">
                <Flex
                  bgColor="#F7F7F2"
                  border={
                    selectedBoolean === "yes" ? "2px solid #FFDE34" : "none"
                  }
                  w="68px"
                  h="68px"
                  borderRadius="12px"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  gap="0.4rem"
                  onClick={() => setSelectedBoolean("yes")}
                  cursor="pointer"
                >
                  <AppText fontSize="1.8rem" color="#000">
                    😁
                  </AppText>
                  <AppText fontSize="1.4rem" color="#000">
                    Yes
                  </AppText>
                </Flex>
                <Flex
                  bgColor="#F7F7F2"
                  border={
                    selectedBoolean === "no" ? "2px solid #FFDE34" : "none"
                  }
                  w="68px"
                  h="68px"
                  borderRadius="12px"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  gap="0.4rem"
                  onClick={() => setSelectedBoolean("no")}
                  cursor="pointer"
                >
                  <AppText fontSize="1.8rem" color="#000">
                    😔
                  </AppText>
                  <AppText fontSize="1.4rem" color="#000">
                    No
                  </AppText>
                </Flex>
              </Flex>
            )}

            {(questionType === QuestionType.MULTIPLE_CHOICE ||
              questionType === QuestionType.BOOLEAN_WITH_MULTIPLE_CHOICE) && (
              <Flex flexDirection="column" gap="0.8rem">
                <AppText fontWeight="500" mb="0.8rem">
                  {booleanChoiceInstruction}
                </AppText>
                <Flex flexDirection="column" gap="1.5rem">
                  {options.map((option) => (
                    <Flex key={option}>
                      <Checkbox.Root
                        variant="solid"
                        colorScheme="#2A180E"
                        size="lg"
                        checked={selectedOptions.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedOptions([...selectedOptions, option]);
                          } else {
                            setSelectedOptions(
                              selectedOptions.filter((o) => o !== option)
                            );
                          }
                        }}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                          _checked={{
                            bg: "#2A180E",
                            color: "white",
                          }}
                        />
                        <Checkbox.Label color="#2A180E" fontSize="1.4rem">
                          {option}
                        </Checkbox.Label>
                      </Checkbox.Root>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            )}

            {questionType === QuestionType.SINGLE_CHOICE && (
              <Flex flexDirection="column" gap="0.8rem">
                {options.map((option) => (
                  <Flex key={option}>
                    <RadioGroup.Root
                      variant="solid"
                      size="lg"
                      value={selectedOptions[0] || ""}
                      onValueChange={(value) => {
                        setSelectedOptions([value.value || ""]);
                      }}
                    >
                      <RadioGroup.Item value={option}>
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator
                          _checked={{
                            bg: "#2A180E",
                            color: "white",
                          }}
                        />
                        <RadioGroup.ItemText color="#2A180E" fontSize="1.4rem">
                          {option}
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </RadioGroup.Root>
                  </Flex>
                ))}
              </Flex>
            )}

            {(questionType === QuestionType.SINGLE_CHOICE_WITH_INPUT ||
              questionType === QuestionType.MULTIPLE_CHOICE_WITH_INPUT) && (
              <>
                <Flex flexDirection="column" gap="0.8rem">
                  {options.map((option) => (
                    <Flex key={option}>
                      {questionType ===
                      QuestionType.SINGLE_CHOICE_WITH_INPUT ? (
                        <RadioGroup.Root
                          variant="solid"
                          size="lg"
                          value={selectedOptions[0] || ""}
                          onValueChange={(value) => {
                            setSelectedOptions([value.value || ""]);
                          }}
                        >
                          <RadioGroup.Item value={option}>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator
                              _checked={{
                                bg: "#2A180E",
                                color: "white",
                              }}
                            />
                            <RadioGroup.ItemText
                              color="#2A180E"
                              fontSize="1.4rem"
                            >
                              {option}
                            </RadioGroup.ItemText>
                          </RadioGroup.Item>
                        </RadioGroup.Root>
                      ) : (
                        <Checkbox.Root
                          variant="solid"
                          colorScheme="#2A180E"
                          size="lg"
                          checked={selectedOptions.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedOptions([...selectedOptions, option]);
                            } else {
                              setSelectedOptions(
                                selectedOptions.filter((o) => o !== option)
                              );
                            }
                          }}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control
                            _checked={{
                              bg: "#2A180E",
                              color: "white",
                            }}
                          />
                          <Checkbox.Label color="#2A180E" fontSize="1.4rem">
                            {option}
                          </Checkbox.Label>
                        </Checkbox.Root>
                      )}
                    </Flex>
                  ))}
                </Flex>
                <Input
                  w="100%"
                  h="56px"
                  placeholder="Other (please specify)"
                  borderRadius="14px"
                  border="0.5px solid #999999"
                  p="1.2rem 1.6rem"
                  fontSize="1.6rem"
                  fontWeight="400"
                  color="#2A180E"
                  _focus={{ borderColor: "#999999" }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex w="100%" justifyContent="space-between">
        <Flex
          gap="8px"
          alignItems="center"
          cursor="pointer"
          onClick={handlePreviousQuestion}
        >
          <IoIosArrowBack color="#FF662D" size="2rem" />
          <AppText fontSize="1.6rem" color="#FF662D">
            Previous
          </AppText>
        </Flex>
        {!isSubmit ? (
          <Flex
            gap="8px"
            alignItems="center"
            bgColor="#4A2111"
            border="1px solid #E7E5D6"
            p="0.8rem 2.4rem"
            borderRadius="32px"
            onClick={handleNextQuestion}
            cursor="pointer"
          >
            <AppText fontSize="1.6rem" color="#F7F7F2" fontWeight="500">
              Next Question
            </AppText>
          </Flex>
        ) : (
          <Flex
            gap="8px"
            alignItems="center"
            bgColor="#4A2111"
            border="1px solid #E7E5D6"
            p="0.8rem 2.4rem"
            borderRadius="32px"
            onClick={handleSubmit}
            cursor="pointer"
          >
            <AppText fontSize="1.6rem" color="#F7F7F2" fontWeight="500">
              Submit
            </AppText>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default QuestionCard;
