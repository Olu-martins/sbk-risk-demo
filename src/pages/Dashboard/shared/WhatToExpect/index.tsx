import { Button, Flex } from "@chakra-ui/react";
import { AppText } from "@components/Text";
import React from "react";
import { FiCheck, FiClock, FiArrowRight } from "react-icons/fi";


interface WhatToExpectProps {
  checklist: string[];
  title?: string;
  walkthroughLabel?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  estimatedTime?: string;
  showWalkthroughLabel?: boolean;
  showEstimatedTime?: boolean;
  children?: React.ReactNode;
}


const WhatToExpect: React.FC<WhatToExpectProps> = ({
  checklist,
  title = "What to expect",
  walkthroughLabel = "A quick walkthrough of:",
  buttonLabel,
  onButtonClick,
  estimatedTime = "12 – 15 mins",
  showWalkthroughLabel = true,
  showEstimatedTime = true,
  children,
}) => {
  return (
    <Flex
      bg="#F7F7F299"
      borderRadius="16px"
      p="24px"
      display="flex"
      border="1px solid #F0EFE5"
      flexDirection="column"
      gap="8px"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="8px">
        <AppText fontWeight="500" fontSize="20px">
          {title}
        </AppText>
        {buttonLabel && (
          <Button
            background="#FF662D"
            color="#F7F7F2"
            border="1px solid #E7E5D6"
            borderRadius="32px"
            padding="8px 24px"
            gap="8px"
            height="44px"
            fontSize="16px"
            fontWeight="500"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={onButtonClick}
          >
            {buttonLabel}
            <FiArrowRight size={18} />
          </Button>
        )}
      </Flex>
      <Flex flexDirection="column" gap="16px">
        <Flex flexDirection="column" gap="12px" maxWidth="60%">
          {showWalkthroughLabel && (
            <AppText color="#5A5654" fontSize="18px">
              {walkthroughLabel}
            </AppText>
          )}
          <Flex flexDirection="column" gap="8px">
            {checklist.map((item, idx) => (
              <Flex key={idx} display="flex" alignItems="center" gap="12px">
                <FiCheck size={16} color="#FF662D" />
                <AppText color="#5A5654" fontSize="16px">
                  {item}
                </AppText>
              </Flex>
            ))}
          </Flex>
        </Flex>
        {showEstimatedTime && (
          <Flex alignItems="center" gap="12px">
            <Flex alignItems="center" gap="12px" color="#5A5654" fontSize="18px">
              <FiClock size={20} />
              Estimated time:&nbsp;
            </Flex>
            <AppText fontWeight="500" fontSize="16px">
              {estimatedTime}
            </AppText>
          </Flex>
        )}
        {children}
      </Flex>
    </Flex>
  );
};

export default WhatToExpect;
