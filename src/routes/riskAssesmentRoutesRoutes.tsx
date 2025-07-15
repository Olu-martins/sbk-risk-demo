import { Route } from "react-router-dom";
import RiskAssesmentFlows from "@pages/Dashboard/RiskAssesment/index";

const RiskAssesmentRoutes = () => (
  <>
    <Route path="risk-assesment" element={<RiskAssesmentFlows />} />
  </>
);

export default RiskAssesmentRoutes;
