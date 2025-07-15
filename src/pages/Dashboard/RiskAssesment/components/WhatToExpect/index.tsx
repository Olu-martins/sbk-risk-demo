import React from "react";
import { useNavigate } from "react-router-dom";
import WhatToExpect from "../../../shared/WhatToExpect";

const checklist = [
  "Based on the assets you've shared earlier, we'll walk you through a short set of questions to help you identify the areas that might be exposed to risks, and how to stay ahead of them.",
  "You're in control, and we'll guide you every step of the way.",
];


const WWhatToExpect: React.FC = () => {
  const navigate = useNavigate();
  return (
    <WhatToExpect
      checklist={checklist}
      buttonLabel="Start Risk Assesment"
      onButtonClick={() => navigate("/risk-assesment/details")}
      showWalkthroughLabel={false}
      showEstimatedTime={false}
    />
  );
};

export default WWhatToExpect;
