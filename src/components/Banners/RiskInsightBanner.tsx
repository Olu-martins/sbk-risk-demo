import { Flex, Image } from "@chakra-ui/react";
import banner from "@assets/svgs/RiskInsightBanner.svg";

const RiskInsightBanner = () => {
  return (
    <Flex w="100%" h="100%">
        <Image w="100%" h="100%" objectFit="cover" src={banner} alt="banner" />
  </Flex>
  );
};

export default RiskInsightBanner;
