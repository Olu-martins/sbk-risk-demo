import { Flex, Box, Button } from "@chakra-ui/react";
import { AppText } from "@components/Text";
import { ReactNode } from "react";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoMdArrowForward } from "react-icons/io";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { MdOutlineShield } from "react-icons/md";
import { MdOutlineFactCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
enum FeatureStep {
  BusinessContext = 1,
  AssetsInventory,
  RiskManagement,
  PolicyChecklist,
}

// Props for the reusable card
interface FeatureCardProps {
  step: FeatureStep;
  title: string;
  description: string;
  icon: ReactNode;
  active?: boolean;
  buttonText?: string;
  onClick: () => void;
}

const FeatureCard = ({
  step,
  title,
  description,
  icon,
  active = false,
  buttonText = "Coming up",
  onClick,
}: FeatureCardProps) => {
  // Color and border logic based on step and active
  const borderColors = {
    [FeatureStep.BusinessContext]: "#EF35CD",
    [FeatureStep.AssetsInventory]: "#FF662D",
    [FeatureStep.RiskManagement]: "#42DB4E",
    [FeatureStep.PolicyChecklist]: "#FFDE34",
  };
  const borderColor = borderColors[step];

  return (
    <Box
      borderRadius="12px"
      borderLeft="4px solid "
      borderRight="1.5px solid #F0EFE5"
      borderTop="1.5px solid #F0EFE5"
      borderBottom="1.5px solid #F0EFE5"
      borderLeftColor={borderColor}
      p="1.6rem 2.4rem"
      minW="240px"
      bg="white"
      display="flex"
      flexDirection="column"
      gap="2rem"
      alignItems="flex-start"
      justifyContent="space-between"
      onClick={onClick}
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
            Step {step}
          </AppText>
        </Flex>
        <Flex
          h="20px"
          w="20px"
          borderRadius="100%"
          border={`1px dashed ${active ? borderColor : "#000000"}`}
        ></Flex>
      </Flex>
      <Flex flexDirection="column" gap="1.2rem">
        <Flex alignItems="center" gap="1.6rem">
          <Box>{icon}</Box>
          <AppText fontWeight="500">{title}</AppText>
        </Flex>
        <Flex>
          <AppText fontSize="12px">{description}</AppText>
        </Flex>
      </Flex>
      <Flex>
        <Button
          colorScheme={active ? borderColor : undefined}
          bg={active ? borderColor : "gray.200"}
          color={active ? "#F7F7F2" : "gray.500"}
          borderRadius="32px"
          border={active ? `1px solid ${borderColor}` : "none"}
          p="8px  24px"
          fontSize="16px"
          fontWeight="500"
          h="36px"
          disabled={!active}
          _hover={active ? { bg: borderColor } : {}}
        >
          {active ? (
            <Flex alignItems="center" gap="8px">
              Start
              <IoMdArrowForward />
            </Flex>
          ) : (
            buttonText
          )}
        </Button>
      </Flex>
    </Box>
  );
};

const Features = ({
  isBusinessContextCompleted,
  isAssetsInventoryCompleted,
}: {
  isBusinessContextCompleted: boolean;
  isAssetsInventoryCompleted: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Flex w="full" justify="center" align="flex-start" gap={4}>
      <FeatureCard
        step={FeatureStep.BusinessContext}
        title="Business Context"
        description="Tell us who you are, what you do, and who's watching (hi, GDPR 👀)"
        icon={<MdOutlineLibraryBooks color="#2A180E" size="24px" />}
        active={!isBusinessContextCompleted}
        buttonText={isBusinessContextCompleted ? "Completed" : "Coming up"}
        onClick={() => {
          navigate("/dashboard/business-context");
        }}
      />
      <FeatureCard
        step={FeatureStep.AssetsInventory}
        title="Assets Inventory"
        description="Let's take stock of all the moving parts of your system and data."
        icon={<MdOutlineStoreMallDirectory color="#2A180E" size="24px" />}
        active={isBusinessContextCompleted && !isAssetsInventoryCompleted}
        onClick={() => {
          navigate("/dashboard/assets-inventory");
        }}
      />
      <FeatureCard
        step={FeatureStep.RiskManagement}
        title="Risk Management"
        description="Let's understand your risks and plan for them like pro."
        icon={<MdOutlineShield color="#2A180E" size="24px" />}
        active={false}
        onClick={() => {
          navigate("/dashboard/risk-assesment");
        }}
      />
      <FeatureCard
        step={FeatureStep.PolicyChecklist}
        title="Policy Checklist"
        description="Security Plans need a paper trail. Let's build yours, tailored to you."
        icon={<MdOutlineFactCheck color="#2A180E" size="24px" />}
        active={false}
        onClick={() => {
          navigate("/dashboard/policy-checklist");
        }}
      />
    </Flex>
  );
};

export default Features;
