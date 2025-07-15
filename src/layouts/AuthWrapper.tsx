import { Flex, Image, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Logo from "@assets/svgs/Logo.svg";
import KeyLock from "@assets/svgs/KeyLock.svg";

const AuthWrapper = () => {
  return (
    <Flex width="100%" height="100vh" p={0} m={0}>
      <Flex
        width="40%"
        height="100%"
        backgroundColor="#2A180E"
        flexDirection="column"
        p="6rem"
        gap="6rem"
      >
        <Flex>
          <Image src={Logo} alt="logo" />
        </Flex>
        <Flex width="60%" mx="auto" justifyContent="center" alignItems="center">
          <Image src={KeyLock} alt="key-lock" objectFit="contain" h="25rem" />
        </Flex>
        <Flex flexDirection="column" gap="2rem">
          <Text
            fontSize="3.6rem"
            lineHeight="3.6rem"
            fontWeight="bold"
            color="#fff"
            letterSpacing="-2%"
          >
            Startups need security from day one.
          </Text>
          <Text fontSize="1.8rem" color="#F7F7F2">
            Our frameworks and education curriculums are practical, impactful
            and ready to help you.
          </Text>
        </Flex>
      </Flex>
      <Flex width="60%" backgroundColor="#fff" gap="5rem">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AuthWrapper;
