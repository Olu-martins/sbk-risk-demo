import { Flex } from "@chakra-ui/react";
import Banner from "@components/Banners/BusinessContextBanner";
import WhatToExpect from "./components/WhatToExpect";
import PlaylistCTA from "../shared/PlaylistCTA";
const BusinessContext = () => {
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" gap="4rem">
        <Banner />
        <WhatToExpect />
      </Flex>
      <Flex position="fixed" bottom="4rem" right="4rem" zIndex={100}>
        <PlaylistCTA />
      </Flex>
    </Flex>
  );
};

export default BusinessContext;
