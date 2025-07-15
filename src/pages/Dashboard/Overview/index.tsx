import { Flex } from "@chakra-ui/react";
import Banner from "@components/Banners/OverviewBanner";
import Progress from "./components/Progress";
import Features from "./components/Features";
import { useEffect, useState } from "react";
import { useGetBusinessContextQuery } from "@api/features/businessContext.api";
import { calculateProgress } from "@utils/businessContextUtils";
import { createEmptyBusinessContext } from "@utils/businessContextUtils";

const Overview = () => {
  const [value, setValue] = useState([0]);
  const [completed, setCompleted] = useState(0);

  const { data: businessContext } = useGetBusinessContextQuery();

  const { overall: businessContextOverall } = calculateProgress(
    businessContext?.data?.context || createEmptyBusinessContext()
  );

  useEffect(() => {
    if (businessContextOverall === 100) {
      setValue([25]);
      setCompleted(1);
    } else {
      setValue([0]);
      setCompleted(0);
    }
  }, [businessContextOverall]);

  return (
    <Flex flexDirection="column" gap="4rem">
      <Banner />
      <Progress value={value} completed={completed} />
      <Features
        isBusinessContextCompleted={businessContextOverall === 100}
        isAssetsInventoryCompleted={false}
      />
    </Flex>
  );
};

export default Overview;
