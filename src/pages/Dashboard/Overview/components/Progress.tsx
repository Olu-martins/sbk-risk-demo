import { Flex, Slider } from "@chakra-ui/react";
import { AppTitle, AppText } from "@components/Text";

const Progress = ({
  value,
  completed,
}: {
  value: number[];
  completed: number;
}) => {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="space-between">
      <Flex flexDirection="column" gap="1.6rem" width="50%">
        <AppTitle>Set up your dashboard</AppTitle>
        <AppText>
          Complete these steps to set up your account, and get ready for your
          audit. <br /> You can pause anytime and pick up where you left off 🚀
        </AppText>
      </Flex>
      <Flex width="15%"></Flex>
      <Flex flexDirection="column" gap="1.6rem" width="35%">
        <Flex justifyContent="space-between" alignItems="center">
          <AppText fontWeight="500">Overall set up progress</AppText>
          <AppText fontWeight="500">{completed}/4 completed</AppText>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Slider.Root bg="#F7F7F2" w="100%" value={value} size="lg">
            <Slider.Control>
              <Slider.Track bg="#F7F7F2">
                <Slider.Range bg="#42DB4E" />
              </Slider.Track>
              <Slider.Thumbs bg="#42DB4E" />
            </Slider.Control>
          </Slider.Root>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Progress;
