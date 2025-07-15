import { AssetsInventoryKeys } from '+types';

export const calculateAssetProgress = (context: AssetsInventoryKeys) => {
  // Calculate percentage completion for each section
  const sectionFields = {
    Software: ["Software.licenses", "Software.usage"],
    Engineering: ["Engineering.platforms", "Engineering.tools"],
    Databases: ["Databases.types", "Databases.access"],
    Financial: ["Financial.platforms", "Financial.data"],
    CustomerService: ["CustomerService.channels", "CustomerService.data"],
    ITInfrastructure: ["ITInfrastructure.assets", "ITInfrastructure.security"],
    Legal: ["Legal.documents", "Legal.compliance"],
    OtherPlatforms: ["OtherPlatforms.details"],
  };
  let total = 0;
  let filled = 0;
  const sections: Record<string, number> = {};
  Object.entries(sectionFields).forEach(([section, fields]) => {
    const sectionTotal = fields.length;
    const sectionFilled = fields.filter((f) => {
      const value = context[f as keyof AssetsInventoryKeys];
      return typeof value === 'string' && value.trim() !== '';
    }).length;
    sections[section] = Math.round((sectionFilled / sectionTotal) * 100);
    total += sectionTotal;
    filled += sectionFilled;
  });
  const overall = Math.round((filled / total) * 100);
  return { overall, sections };
};
