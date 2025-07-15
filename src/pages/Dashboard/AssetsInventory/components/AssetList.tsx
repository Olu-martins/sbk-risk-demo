import { Flex, Grid } from "@chakra-ui/react";
import { AppText } from "@components/Text";
import { useState } from "react";
import LeatherChair from "@assets/svgs/LeatherCard.svg";
import {
  MdFormatListBulleted,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineViewCompactAlt,
} from "react-icons/md";
const AssetsList = ({ assets }: { assets: string[] }) => {
  const [view, setView] = useState<"list" | "grid">("list");
  return (
    <Flex flexDirection="column" gap="2.4rem">
      <Flex justifyContent="space-between" alignItems="center" gap="1.6rem">
        <AppText fontSize="2rem" fontWeight="500">
          Your Assets
        </AppText>
        {view === "grid" && (
          <MdFormatListBulleted
            color="#2A180E"
            size="26px"
            onClick={() => setView("list")}
          />
        )}
        {view === "list" && (
          <MdOutlineViewCompactAlt
            color="#2A180E"
            size="26px"
            onClick={() => setView("grid")}
          />
        )}
      </Flex>
      {view === "grid" ? (
        <Grid templateColumns="repeat(4, 1fr)" gap="2.4rem">
          {assets.map((asset: string, index: number) => (
            <GridItem asset={asset} index={index} />
          ))}
        </Grid>
      ) : (
        <Flex flexDirection="column" gap="2.4rem">
          {assets.map((asset: string) => (
            <ListItem asset={asset} key={asset} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const GridItem = ({ asset, index }: { asset: string; index: number }) => {
  return (
    <>
      {index % 2 === 0 ? (
        <Flex
          h="29rem"
          p="1.6rem"
          w="100%"
          borderRadius="1.2rem"
          key={asset}
          backgroundImage={`url(${LeatherChair})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="relative"
        >
          <Flex
            border="1px dashed #F7F7F2"
            borderRadius="1.2rem"
            p="2.4rem 1.6rem"
            flexDirection="column"
            justifyContent="space-between"
            w="100%"
            h="100%"
            position="relative"
            zIndex="2"
          >
            <AppText
              color="#E7E5D6"
              fontSize="2.8rem"
              fontWeight="500"
              position="relative"
              zIndex="3"
            >
              {asset}
            </AppText>
            <AppText
              color="#F7F7F2"
              fontSize="1.2rem"
              fontWeight="400"
              position="relative"
              zIndex="3"
              w="fit-content"
              textAlign="center"
              backgroundColor="#FFDE3433"
              borderRadius="3.2rem"
              padding="0.8rem 1.2rem"
              margin="0 auto"
            >
              Flip to see your asset
            </AppText>
          </Flex>
        </Flex>
      ) : (
        <Flex
          h="29rem"
          p="1.6rem"
          w="100%"
          borderRadius="1.2rem"
          key={asset}
          bgColor="#F7F7F2"
        >
          <Flex
            border="1px dashed #4A2111"
            borderRadius="1.2rem"
            p="2.4rem 1.6rem"
            flexDirection="column"
            justifyContent="space-between"
            w="100%"
            h="100%"
          >
            <AppText
              fontSize="2.8rem"
              fontWeight="500"
              position="relative"
              zIndex="3"
            >
              {asset}
            </AppText>
            <AppText
              color="#0F0905"
              fontSize="1.2rem"
              fontWeight="400"
              w="fit-content"
              textAlign="center"
              backgroundColor="#E7E5D6"
              borderRadius="3.2rem"
              padding="0.8rem 1.2rem"
              margin="0 auto"
            >
              Flip to see your asset
            </AppText>
          </Flex>
        </Flex>
      )}
    </>
  );
};

const ListItem = ({
  asset,
}: {
  asset: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Flex
      border="1px solid #F0EFE5"
      borderRadius="0.8rem"
      justifyContent="space-between"
      alignItems="center"
      p="3.2rem"
    >
      <AppText fontSize="1.2rem" color="#5A5654" fontWeight="500">
        {asset.toUpperCase()}
      </AppText>
      <Flex alignItems="center" gap="1.6rem">
        <AppText color="#FF662D">Expand</AppText>
        {isExpanded ? (
          <MdKeyboardArrowUp
            onClick={() => setIsExpanded(!isExpanded)}
            cursor="pointer"
            color="#FF662D"
            size="2.4rem"
          />
        ) : (
          <MdKeyboardArrowDown
            onClick={() => setIsExpanded(!isExpanded)}
            cursor="pointer"
            color="#FF662D"
            size="2.4rem"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default AssetsList;
