import { Route } from "react-router-dom";
import BusinessContext from "@pages/Dashboard/BusinessContext";
import BusinessContextFormFlows from "@pages/Dashboard/BusinessContext/components/FormFlows";
import FormPreview from "@pages/Dashboard/BusinessContext/components/FormFlows/Preview";
import FormSuccess from "@pages/Dashboard/BusinessContext/components/FormFlows/Success";

const BusinessContextRoutes = () => (
  <>
    <Route path="business-context/create" element={<BusinessContextFormFlows />} />
    <Route path="business-context/preview" element={<FormPreview />} />
    <Route path="business-context/success" element={<FormSuccess />} />
    <Route path="business-context" element={<BusinessContext />} />
  </>
);

export default BusinessContextRoutes;
