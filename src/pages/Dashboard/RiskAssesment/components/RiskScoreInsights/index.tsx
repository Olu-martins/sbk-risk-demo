import {
  ScoreCard,
  LIKELIHOOD_CARDS,
  IMPACT_CARDS,
} from "@pages/Dashboard/RiskAssesment/helpers";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

const RiskScoreInsights = () => {
  return (
    <Box
      width="90%"
      height="100%"
      marginTop="-80px"
      borderRadius="16px"
      bg="white"
      padding="3rem"
      border="1px solid #E2E8F0"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Flex
        flexDirection="column"
        borderBottom="1.5px solid #f0EFE5"
        color="#000000"
        gap="1.5rem"
      >
        <Flex fontSize="20px" fontWeight="bold" color="#8B4513">
          Let's understand how your risk score is calculated
        </Flex>

        <Flex fontSize="16px" fontWeight="bold">
          What is "Likelihood"?
        </Flex>
        <Text fontSize="14px" color="#555">
          It's the probability or chance that something risky will happen and
          cause problems. Think of it as an estimate of how likely that risk is
          to show up and cause trouble. It is rated based on a five-point scale
          as shown below.
        </Text>

        <Flex
          gap="1rem"
          alignItems="flex-start"
          flexWrap="nowrap"
          overflowX="auto"
          // padding="30px"
        >
          {LIKELIHOOD_CARDS.map((item) => (
            <ScoreCard key={item.score} {...item} />
          ))}
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        borderBottom="1.5px solid #f0EFE5"
        color="#000000"
        gap="1.5rem"
      >
        <Flex fontSize="16px" fontWeight="bold" marginTop="1rem">
          What is "Impact"?
        </Flex>
        <Text fontSize="14px" color="#555">
          It is basically how bad things could get if the risk actually happens.
          It's all about how severe the consequences could be.
        </Text>

        <Flex
          gap="1rem"
          alignItems="flex-start"
          flexWrap="nowrap"
          overflowX="auto"
        >
          {IMPACT_CARDS.map((item) => (
            <ScoreCard key={item.score} {...item} />
          ))}
        </Flex>
      </Flex>
      <Flex flexDirection="column" color="#000000" gap="1.5rem">
        <Flex fontSize="16px" fontWeight="bold" marginTop="1rem">
          What is "Risk Score"?
        </Flex>
        <Text fontSize="14px" color="#555">
          It's calculated by multiplying the chance of a risk happening by how
          bad the impact could be.
        </Text>
        <Text fontSize="14px" fontStyle="italic" color="#555">
          Likelihood x Impact = Risk score
        </Text>
      </Flex>
      <Flex justifyContent="flex-end">
        <Button
          bg="#8B4513"
          color="white"
          borderRadius="20px"
          p="1rem 2rem"
          _hover={{ bg: "#7A3E1A" }}
        >
          I understand now
        </Button>
      </Flex>
    </Box>
  );
};

export default RiskScoreInsights;
