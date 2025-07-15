import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { useGetAssetsQuestionsQuery } from "@api/features/assetsInventory.api";
import { useLocation } from "react-router-dom";
import { AssetsInventoryKeys, AssetsInventoryQuestionDto } from "+types";
import { SectionedPreview, Section } from "@components/Preview/SectionedPreview";

const sections: Section[] = [
  { section: "Software", key: "Software" },
  { section: "Engineering", key: "Engineering" },
  { section: "Databases", key: "Databases" },
  { section: "Financial", key: "Financial" },
  { section: "Customer Service", key: "CustomerService" },
  { section: "IT & Infrastructure", key: "ITInfrastructure" },
  { section: "Legal & Contractual", key: "Legal" },
  { section: "Other Platforms", key: "OtherPlatforms" },
];

const AssetsInventoryPreview = () => {
  const { context } = useLocation().state;
  const { data: questions } = useGetAssetsQuestionsQuery();

  return (
    <SectionedPreview<AssetsInventoryKeys, AssetsInventoryQuestionDto>
      icon={<MdOutlineStoreMallDirectory color="#2A180E" size="24px" />}
      title="Review Your Assets Inventory Selection"
      sections={sections}
      questions={questions?.data || []}
      context={context}
      getAnswer={(context, q) => context[`${q.section}.${q.key}` as keyof AssetsInventoryKeys]}
    />
  );
};

export default AssetsInventoryPreview;
