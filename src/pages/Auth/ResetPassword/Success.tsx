import { Flex, Text } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { TickCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="#fff"
      flexDirection="column"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="4.8rem"
        width="40%"
        mt="10rem"
        mx="auto"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          gap="3.2rem"
          flexDirection="column"
        >
          <TickCircle size="100" color="#127813" variant="Bold" />

          <Flex flexDirection="column" gap="1.6rem">
            <Text
              textAlign="center"
              fontSize="2.4rem"
              fontWeight="500"
              color="#000"
            >
              Your password has been reset successfully
            </Text>
            <Text
              fontSize="1.6rem"
              fontWeight="400"
              color="#000"
              lineHeight="2.4rem"
              textAlign="center"
            >
              You’ll need to log in to your account to continue
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2.4rem"
          width="100%"
        >
          <Flex width="100%">
            <PrimaryButton onClickFxn={() => navigate("/login")}>
              Go to Login
            </PrimaryButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResetPasswordSuccess;
