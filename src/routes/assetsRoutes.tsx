import { Route } from "react-router-dom";
import Assets from "@pages/Dashboard/AssetsInventory";
import AssetsInventoryPreview from "@pages/Dashboard/AssetsInventory/components/AssetsInventoryPreview";
import FormFlows from "@pages/Dashboard/AssetsInventory/components/FormFlows";

const AssetsRoutes = () => (
  <>
    <Route path="assets-inventory/create" element={<FormFlows />} />
    <Route path="assets-inventory/preview" element={<AssetsInventoryPreview />} />
    <Route path="assets-inventory" element={<Assets />} />
  </>
);

export default AssetsRoutes;
