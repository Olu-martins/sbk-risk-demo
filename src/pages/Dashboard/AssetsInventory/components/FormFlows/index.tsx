import { Box, Flex, Slider } from "@chakra-ui/react";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { AppText } from "@components/Text";
import { useEffect, useState } from "react";
import FormLayout from "@components/FormSections/FormLayout";
import { useGetAssetsQuery, useGetAssetsQuestionsQuery } from "@api/features/assetsInventory.api";
import { calculateAssetProgress, createEmptyAssetContext } from "@utils/assetsUtils";
import { AssetsInventoryKeys, FormSection } from "+types";
import { useNavigate } from "react-router-dom";

const FormFlows = () => {
  const { data: assets } = useGetAssetsQuery();
  const [context, setContext] = useState<AssetsInventoryKeys>(createEmptyAssetContext());
  const { data: questionsData } = useGetAssetsQuestionsQuery();
  const { overall, sections: progressSections } = calculateAssetProgress(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (assets?.data) {
      setContext(assets.data.context);
    }
  }, [assets]);

  const sections: FormSection[] = [
    { section: "Software", key: "Software", percentage: progressSections.Software },
    { section: "Engineering", key: "Engineering", percentage: progressSections.Engineering },
    { section: "Databases", key: "Databases", percentage: progressSections.Databases },
    { section: "Financial", key: "Financial", percentage: progressSections.Financial },
    { section: "Customer Service", key: "CustomerService", percentage: progressSections.CustomerService },
    { section: "IT & Infrastructure", key: "ITInfrastructure", percentage: progressSections.ITInfrastructure },
    { section: "Legal & Contractual", key: "Legal", percentage: progressSections.Legal },
    { section: "Other Platforms", key: "OtherPlatforms", percentage: progressSections.OtherPlatforms },
  ];

  const handleSubmit = () => {
    navigate("/dashboard/assets-inventory/preview", { state: { context } });
  };

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
      <FormLayout
        context={context}
        setContext={setContext}
        questions={questionsData?.data || []}
        calculateProgress={calculateAssetProgress}
        sections={sections}
        handleSubmit={handleSubmit}
      />
    </Flex>
  );
};

export default FormFlows;
