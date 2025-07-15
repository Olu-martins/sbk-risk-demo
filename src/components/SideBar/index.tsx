import { Flex, Image, Text } from "@chakra-ui/react";
import { sideMenu } from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import LogoDark from "@assets/svgs/LogoDark.svg";
import { useState } from "react";

const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  return (
    <Flex width="28rem" height="100vh" bgColor="transparent">
      <Flex flexDirection="column" p="3.2rem  1.2rem" gap="4rem">
        <Flex>
          <Image src={LogoDark} alt="logo" />
        </Flex>

        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="0.8rem"
          margin="0rem"
        >
          {sideMenu.map((item) => {
            const isActive =
              item.path === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.includes(item.path);
            const isHovered = hoveredItem === item.title;
            
            return (
              <Flex
                key={item.title}
                justifyContent="space-between"
                alignItems="center"
                onClick={() => navigate(item.path)}
              >
                <Flex
                  background={isActive ? "#4A2111" : isHovered ? "#4A2111" : "transparent"}
                  borderRadius="0.8rem"
                  padding="0.8rem 1.2rem"
                  alignItems="center"
                  width="20rem"
                  marginBottom="1rem"
                  cursor="pointer"
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                  border={"none"}
                >
                  <Flex alignItems="center" gap="1.2rem">
                    <Flex
                      width="2rem"
                      height="2rem"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {isActive || isHovered ? item.activeIcon : item.icon}
                    </Flex>
                    <Text
                      color={isActive || isHovered ? "#F7F7F2" : "#5A5654"}
                      fontSize="1.4rem"
                      fontWeight={isActive ? "bold" : "normal"}
                      letterSpacing="0%"
                    >
                      {item.title}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
          
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
