import { Button, Flex, Image } from "@chakra-ui/react";
import PlaylistIcon from "@assets/svgs/PlaylistIcon.svg";

const PlaylistCTA = () => {
  const buttonText = (
    <Flex
      alignItems="center"
      gap="16px"
      maxWidth="200px"
      width="200px"
      overflow="hidden"
    >
      <Flex role="img" aria-label="playlist" flexShrink={0}>
        <Image src={PlaylistIcon} />
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="stretch"
        gap="1rem"
        width="0"
        flexGrow={1}
        minWidth={0}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: 12,
            lineHeight: 1.2,
            wordBreak: "break-word",
            whiteSpace: "normal",
            textAlign: "left",
          }}
        >
          Want company?
        </span>
        <span
          style={{
            fontSize: 8,
            color: "#E7E5D6",
            lineHeight: 1.2,
            wordBreak: "break-word",
            whiteSpace: "normal",
            textAlign: "left",
          }}
        >
          We made you a playlist that lasts just as long as this module.
        </span>
      </Flex>
    </Flex>
  );

  return (
    <Flex>
      <Button
        p="8px 8px"
        fontSize="16px"
        fontWeight="500"
        h="86px"
        bg="#4A2111"
        color="white"
        borderRadius="50px"
        _hover={{ bg: "brown.700" }}
        _active={{ bg: "brown.900" }}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};

export default PlaylistCTA;
