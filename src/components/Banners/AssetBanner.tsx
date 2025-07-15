import { Flex, Image } from "@chakra-ui/react";
import banner from "@assets/svgs/Assetbanner.svg"; // Ensure the casing matches the file name

const AssetBanner = () => {
  return (
    <Flex w="100%" h="100%">
        <Image w="100%" h="100%" objectFit="cover" src={banner} alt="banner" />
  </Flex>
  );
};

export default AssetBanner;
