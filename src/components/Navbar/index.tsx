import { Flex, Text, Avatar, Float, Circle } from "@chakra-ui/react";
import { MdOutlineNotifications } from "react-icons/md";

const Navbar = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" width="100%">
      <Flex width={["100%", "fit-content"]}>
        <Text
          color="#2A180E"
          fontSize="1.6rem"
          fontWeight="500"
          lineHeight="2.0rem"
        >
          Welcome Seun 👋🏽
        </Text>
      </Flex>

      <Flex alignItems="center" gap="2.4rem">
        <Flex>
          <MdOutlineNotifications size={24} color="#5A5654" />
        </Flex>
        <Avatar.Root
          bgColor="#E7E5D6"
          color="#000"
          fontWeight={600}
          variant="subtle"
          size="xl"
        >
          <Avatar.Fallback name="Seun Nolte" />
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Circle
              bg="#127813"
              size="8px"
              outline="0.8px solid"
              outlineColor="#fff"
            />
          </Float>
        </Avatar.Root>
      </Flex>
    </Flex>
  );
};

export default Navbar;
