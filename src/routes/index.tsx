import { Route, Routes } from "react-router-dom";
import AuthWrapper from "@layout/AuthWrapper";
import DashboardLayout from "@layout/DashboardLayout";
import Overview from "@pages/Dashboard/Overview";
import BusinessContextRoutes from "./businessContextRoutes";
import AssetsRoutes from "./assetsRoutes";
import AuthRoutes from "./authRoutes";
import RiskAssesmentRoutes from "./riskAssesmentRoutesRoutes";
import RiskAssesmentDetails from "@pages/Dashboard/RiskAssesment/components/index";

const Router = () => {
  return (
    <Routes>
      {/* Auth-related routes */}
      <Route path="/" element={<AuthWrapper />}>
        {AuthRoutes()}
      </Route>

      {/* Dashboard layout and all dashboard feature routes */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        {BusinessContextRoutes()}
        {AssetsRoutes()}
        {RiskAssesmentRoutes()}
      </Route>

      {/* RiskAssesmentDetails route outside dashboard layout */}
      <Route path="risk-assesment/details" element={<RiskAssesmentDetails />} />
    </Routes>
  );
};

export default Router;
