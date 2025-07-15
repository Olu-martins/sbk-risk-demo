import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RiskInsightBanner from "@components/Banners/RiskInsightBanner";
import RiskScoreInsights from "./RiskScoreInsights";
import Logo from "@assets/svgs/LogoDark.svg";

const RiskAssesmentDetails = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" minH="100vh">
      <Flex
        as="header"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        bg="#fff"
        style={{ borderBottom: "none" }}
        px="4rem"
        py={6}
      >
        <Link to="/dashboard">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "40px", cursor: "pointer", display: "block" }}
          />
        </Link>
        <Button
          onClick={() => navigate("/dashboard/risk-assesment")}
          color="#F03E26"
          fontSize="14px"
          height="auto"
          className="leave-risk-btn"
        >
          Leave risk assessment
        </Button>
      </Flex>
      <Flex direction="column" gap={4} align="center" w="full" flex={1} mt={8}>
        <RiskInsightBanner />
        <RiskScoreInsights />
      </Flex>
    </Flex>
  );
};

export default RiskAssesmentDetails;
