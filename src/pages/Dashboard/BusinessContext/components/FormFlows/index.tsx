import { Box, Flex, Slider } from "@chakra-ui/react";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AppText } from "@components/Text";
import { useEffect, useState } from "react";
// import Cookie from "./Cookie";
import FormLayout from "@components/FormSections/FormLayout";
import { useGetBusinessContextQuery, useGetBusinessContextQuestionsQuery } from "@api/features/businessContext.api";
import {
  calculateProgress,
  createEmptyBusinessContext,
} from "@utils/businessContextUtils";
import { BusinessContextKeys, FormSection } from "+types";
import { useNavigate } from "react-router-dom";

const BusinessContextFormFlows = () => {
  const { data: businessContext } = useGetBusinessContextQuery();
  const { data: questionsData } = useGetBusinessContextQuestionsQuery();

  const [context, setContext] = useState<BusinessContextKeys>(
    createEmptyBusinessContext()
  );

  const { overall, sections: progressSections } = calculateProgress(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (businessContext?.data) {
      setContext(businessContext.data.context);
    }
  }, [businessContext]);

  const sections: FormSection[] = [
    {
      section: "Organization",
      key: "Overview",
      percentage: progressSections.Overview,
    },
    {
      section: "Internal",
      key: "Internal",
      percentage: progressSections.Internal,
    },
    {
      section: "External",
      key: "External",
      percentage: progressSections.External,
    },
    {
      section: "Scope of the ISMS",
      key: "Scope_ISMS",
      percentage: progressSections.Scope_ISMS,
    },
  ];

  const handleSubmit = () => {
    navigate("/dashboard/business-context/preview", { state: { context } });
  };

  return (
    <Flex
      flexDirection="column"
      // p="40px 40px 20px 40px"
      borderRadius="16px"
      gap="16px"
      width="100%"
      mx="auto"
    >
      <Flex gap="12px" flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="1.2rem">
            <Box>
              <MdOutlineLibraryBooks color="#2A180E" size="24px" />{" "}
            </Box>
            <AppText fontWeight="500" fontSize="2rem">
              Business Context
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
        <Flex flexDirection="column" gap="12px" width="100%">
          <AppText>Overall progress</AppText>

          <Flex justifyContent="space-between" alignItems="center">
            <Slider.Root bg="#F7F7F2" w="100%" value={[overall]} size="lg">
              <Slider.Control>
                <Slider.Track bg="#F7F7F2">
                  <Slider.Range bg="#42DB4E" />
                </Slider.Track>
                <Slider.Thumbs bg="#42DB4E" />
              </Slider.Control>
            </Slider.Root>
          </Flex>
        </Flex>
      </Flex>
      {/* <Cookie /> */}
      <FormLayout
        context={context}
        setContext={setContext}
        questions={questionsData?.data || []}
        calculateProgress={calculateProgress}
        sections={sections}
        handleSubmit={handleSubmit}
      />
    </Flex>
  );
};

export default BusinessContextFormFlows;
