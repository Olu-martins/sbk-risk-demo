import { Flex, Text } from "@chakra-ui/react";

interface LoaderProps {
  width?: string | number;
  height?: string | number;
  text?: string;
}

const Loader = ({ width = "100%", height = "100px", text = "Loading..." }: LoaderProps) => (
  <Flex
    width={width}
    height={height}
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    bg="#F7F7F2"
    borderRadius="12px"
    border="1px solid #F0EFE5"
  >
    <Text fontSize="1.4rem" color="#5A5654">{text}</Text>
  </Flex>
);

export default Loader;
