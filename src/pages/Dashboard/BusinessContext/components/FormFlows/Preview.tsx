import { MdOutlineLibraryBooks } from "react-icons/md";
import { useGetBusinessContextQuestionsQuery } from "@api/features/businessContext.api";
import { useLocation } from "react-router-dom";
import { BusinessContextKeys, BusinessContextQuestionDto } from "+types";
import { SectionedPreview, Section } from "@components/Preview/SectionedPreview";

const sections: Section[] = [
  { section: "Organization Overview", key: "Overview" },
  { section: "Internal", key: "Internal" },
  { section: "External", key: "External" },
  { section: "Scope of the ISMS", key: "Scope_ISMS" },
];

const BusinessContextFormPreview = () => {
  const { context } = useLocation().state;
  const { data: questions } = useGetBusinessContextQuestionsQuery();

  return (
    <SectionedPreview<BusinessContextKeys, BusinessContextQuestionDto>
      icon={<MdOutlineLibraryBooks color="#2A180E" size="24px" />}
      title="Review Your Business Context Selection"
      sections={sections}
      questions={questions?.data || []}
      context={context}
      getAnswer={(context, q) => context[`${q.section}.${q.key}` as keyof BusinessContextKeys]}
    />
  );
};

export default BusinessContextFormPreview;
