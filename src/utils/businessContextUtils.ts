import { BusinessContextKeys, NestedBusinessContext } from '+types';

/**
 * Creates an empty business context object with all fields initialized to empty strings
 */
export const createEmptyBusinessContext = (): BusinessContextKeys => {
  return {
    "Overview.data_handling": "",
    "Overview.system_access": "",
    "Overview.security_concerns": "",
    "Overview.customer_expectations": "",
    "Overview.security_incidents": "",
    "Overview.business_priorities": "",
    "Overview.cybersecurity_importance": "",
    "Overview.breach_impact": "",
    "Internal.key_stakeholders": "",
    "Internal.defined_roles": "",
    "Internal.security_training": "",
    "External.applicable_regulations": "",
    "External.third_party_partners": "",
    "External.compliance_monitoring": "",
    "Scope_ISMS.security_controls": "",
    "Scope_ISMS.excluded_areas": ""
  };
};

/**
 * Converts flat business context to nested structure
 */
export const flatToNested = (flat: BusinessContextKeys): NestedBusinessContext => {
  return {
    Overview: {
      data_handling: flat["Overview.data_handling"],
      system_access: flat["Overview.system_access"],
      security_concerns: flat["Overview.security_concerns"],
      customer_expectations: flat["Overview.customer_expectations"],
      security_incidents: flat["Overview.security_incidents"],
      business_priorities: flat["Overview.business_priorities"],
      cybersecurity_importance: flat["Overview.cybersecurity_importance"],
      breach_impact: flat["Overview.breach_impact"]
    },
    Internal: {
      key_stakeholders: flat["Internal.key_stakeholders"],
      defined_roles: flat["Internal.defined_roles"],
      security_training: flat["Internal.security_training"]
    },
    External: {
      applicable_regulations: flat["External.applicable_regulations"],
      third_party_partners: flat["External.third_party_partners"],
      compliance_monitoring: flat["External.compliance_monitoring"]
    },
    Scope_ISMS: {
      security_controls: flat["Scope_ISMS.security_controls"],
      excluded_areas: flat["Scope_ISMS.excluded_areas"]
    }
  };
};

/**
 * Converts nested business context to flat structure
 */
export const nestedToFlat = (nested: NestedBusinessContext): BusinessContextKeys => {
  return {
    "Overview.data_handling": nested.Overview.data_handling,
    "Overview.system_access": nested.Overview.system_access,
    "Overview.security_concerns": nested.Overview.security_concerns,
    "Overview.customer_expectations": nested.Overview.customer_expectations,
    "Overview.security_incidents": nested.Overview.security_incidents,
    "Overview.business_priorities": nested.Overview.business_priorities,
    "Overview.cybersecurity_importance": nested.Overview.cybersecurity_importance,
    "Overview.breach_impact": nested.Overview.breach_impact,
    "Internal.key_stakeholders": nested.Internal.key_stakeholders,
    "Internal.defined_roles": nested.Internal.defined_roles,
    "Internal.security_training": nested.Internal.security_training,
    "External.applicable_regulations": nested.External.applicable_regulations,
    "External.third_party_partners": nested.External.third_party_partners,
    "External.compliance_monitoring": nested.External.compliance_monitoring,
    "Scope_ISMS.security_controls": nested.Scope_ISMS.security_controls,
    "Scope_ISMS.excluded_areas": nested.Scope_ISMS.excluded_areas
  };
};

/**
 * Calculates the progress percentage for a specific section of the business context
 */
export const calculateSectionProgress = (section: Record<string, string>): number => {
  const fields = Object.values(section);
  const totalFields = fields.length;
  const filledFields = fields.filter(field => field.trim() !== '').length;
  return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
};

/**
 * Calculates progress percentages for all sections and overall progress
 */
export const calculateProgress = (context: BusinessContextKeys): {
  overall: number;
  sections: {
    Overview: number;
    Internal: number;
    External: number;
    Scope_ISMS: number;
  };
} => {

  const nestedContext = flatToNested(context);
  const sections = {
    Overview: calculateSectionProgress(nestedContext.Overview),
    Internal: calculateSectionProgress(nestedContext.Internal),
    External: calculateSectionProgress(nestedContext.External),
    Scope_ISMS: calculateSectionProgress(nestedContext.Scope_ISMS)
  };

  const totalFields = Object.values(nestedContext).reduce(
    (acc, section) => acc + Object.keys(section).length,
    0
  );
  
  const filledFields = Object.values(nestedContext).reduce(
    (acc, section) => acc + Object.values(section).filter((field: string) => field.trim() !== '').length,
    0
  );

  const overall = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

  return {
    overall,
    sections
  };
}; 