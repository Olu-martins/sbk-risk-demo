import { Flex, Text } from "@chakra-ui/react";
import PrimaryButton from "@components/Buttons/PrimaryButton";
import { TickCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="#fff"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="4.8rem"
        width="50%"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          gap="1.6rem"
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
              Look at you go! <br /> You've created the account to secure your
              business
            </Text>
            <Text
              fontSize="1.6rem"
              fontWeight="400"
              color="#000"
              lineHeight="2.4rem"
              textAlign="center"
            >
              We’ll need you to log in to your new account to continue
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2.4rem"
        >
          <Flex width="50%">
            <PrimaryButton onClickFxn={() => navigate("/")}>
              Go to Login
            </PrimaryButton>
          </Flex>

          <Flex width="50%">
            <Text
              textAlign="center"
              fontSize="1.6rem"
              fontWeight="400"
              color="#5A5654"
            >
              You’re joining as an admin of this company. Admins create the
              company account and invite other team members. Permission levels
              can be changed in company settings later.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RegisterSuccess;
