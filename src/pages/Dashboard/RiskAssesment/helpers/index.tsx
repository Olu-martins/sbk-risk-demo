// Data for Likelihood and Impact cards
import { Flex, Text } from "@chakra-ui/react";

export const LIKELIHOOD_CARDS = [
  {
    color: "#FF4040",
    score: 5,
    description: "Very Likely - Strong possibility of occurring",
  },
  {
    color: "#FFA500",
    score: 4,
    description: "Very Likely - Significant chance of occurring",
  },
  {
    color: "#FFD700",
    score: 3,
    description: "Moderate - Moderate probability of occurrence",
  },
  {
    color: "#FF69B4",
    score: 2,
    description: "Unlikely - It might happen, but not often",
  },
  {
    color: "#32CD32",
    score: 1,
    description: "Very Unlikely - Highly unexpected/almost impossible to occur",
  },
];

export const IMPACT_CARDS = [
  {
    color: "#FF4040",
    score: 5,
    description:
      "Catastrophic - Severe impact, like a system failure or legal/compliance breach",
  },
  {
    color: "#FFA500",
    score: 4,
    description:
      "Major - Big impact, like sensitive info being exposed to unauthorized people",
  },
  {
    color: "#FFD700",
    score: 3,
    description:
      "Moderate - Moderate impact, such as internal exposure of sensitive info",
  },
  {
    color: "#FF69B4",
    score: 2,
    description:
      "Minor - Small impact, like a security incident with no data exposure",
  },
  {
    color: "#32CD32",
    score: 1,
    description: "Insignificant - No noticeable impact or consequences",
  },
];

export interface ScoreCardProps {
  color: string;
  score: number | string;
  description: string;
}

export const ScoreCard = ({ color, score, description }: ScoreCardProps) => (
  <Flex flexDirection="column" alignItems="center" gap="0.5rem" padding="2rem" width="250px">
    <Flex
      w="40px"
      h="40px"
      bg={color}
      borderRadius="50%"
      justifyContent="center"
      alignItems="center"
      color="white"
      fontWeight="bold"
      flexShrink="0"
    >
      {score}
    </Flex>
    <Text fontSize="14px" lineHeight="1.2" textAlign="center">
      {description}
    </Text>
  </Flex>
);
