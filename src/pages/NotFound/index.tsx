import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import searchIcon from "../../assets/svgs/Search_empty.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Flex 
      p="2rem" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      h="100vh" 
      maxW="74.4rem" 
      textAlign="center" 
      mx="auto"
    >
      <Image src={searchIcon} alt="Search Icon" />
      <Heading 
        fontSize="3.6rem" 
        fontWeight="bold" 
        mt="3.6rem"
        lineHeight="4.4rem"
      >
        Sorry! This page isn&apos;t available.
      </Heading>
      <Text 
        mb="2.4rem" 
        mt="1.2rem" 
        color="#606060" 
        fontSize="1.8rem" 
        lineHeight="2.8rem"
      >
        The link may be broken or the page may have been removed.
      </Text>
      <Box>
        <PrimaryButton onClickFxn={() => navigate("/", { replace: true })}>
          <Text fontSize="1.4rem">Back to Homepage</Text>
        </PrimaryButton>
      </Box>
    </Flex>
  );
};

export default NotFound;
