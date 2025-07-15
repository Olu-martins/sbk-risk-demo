import React from "react";
import { useNavigate } from "react-router-dom";
import WhatToExpect from "../../shared/WhatToExpect";

const checklist = [
  "What you do & where you operate",
  "Who keeps the lights on",
  "Where your data lives, flows, and grows",
];

const AssetsWhatToExpect: React.FC = () => {
  const navigate = useNavigate();
  return (
    <WhatToExpect
      checklist={checklist}
      buttonLabel="Start Assets Inventory"
      onButtonClick={() => navigate("/dashboard/assets-inventory/create")}
    />
  );
};

export default AssetsWhatToExpect;
