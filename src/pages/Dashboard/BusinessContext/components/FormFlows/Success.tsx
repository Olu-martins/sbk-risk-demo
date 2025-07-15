import { Flex, Image } from "@chakra-ui/react";
import { AppText } from "@components/Text";
import SuccessImage from "@assets/svgs/SuccessTick.svg";
import { useNavigate } from "react-router-dom";

const FormSuccess = () => {
  const navigate = useNavigate();
  return (
    <Flex
      flexDirection="column"
      gap="3.2rem"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDirection="column">
        <Image src={SuccessImage} alt="success" />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.8rem"
        >
          <AppText fontSize="1.8rem" fontWeight="500">
            Great Job! 👍
          </AppText>
          <AppText>Your Business Context is all set.</AppText>
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap="1.6rem">
        <Flex
          gap="8px"
          alignItems="center"
          bgColor="#4A2111"
          border="1px solid #E7E5D6"
          p="0.8rem 2.4rem"
          borderRadius="32px"
          onClick={() => navigate("/dashboard/assets-inventory")}
          cursor="pointer"
        >
          <AppText fontSize="1.6rem" color="#F7F7F2" fontWeight="500">
            Take me to Asssets Inventory
          </AppText>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          onClick={() => navigate("/dashboard")}
          cursor="pointer"
        >
          <AppText
            textAlign="center"
            textDecoration="underline"
            color="#FF662D"
          >
            Back to Dashboard
          </AppText>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FormSuccess;
