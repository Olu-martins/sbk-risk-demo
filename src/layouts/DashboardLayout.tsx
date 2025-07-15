import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import SideBar from "@components/SideBar";
import ProtectedRoute from "@routes/ProtectedRoute";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <ProtectedRoute>
    <Flex width="100%" height="100vh" bgColor="#F7F7F2">
      <SideBar />
      <Box
        m="1.2rem"
        width="100%"
        padding="2rem 2.8rem 1rem 2.8rem"
        gap="3rem"
        display="flex"
        flexDirection="column"
        borderRadius="3.2rem"
        border="1px solid #F0EFE5"
        bg="#FFFFFF"
      >
        <Navbar />

        <Outlet />
      </Box>
    </Flex>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
