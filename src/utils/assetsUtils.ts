import { AssetsInventoryKeys } from '+types';
export * from './calculateAssetProgress';

export const createEmptyAssetContext = (): AssetsInventoryKeys => {
  return {
    "Software.licenses": "",
    "Software.usage": "",
    "Engineering.platforms": "",
    "Engineering.tools": "",
    "Databases.types": "",
    "Databases.access": "",
    "Financial.platforms": "",
    "Financial.data": "",
    "CustomerService.channels": "",
    "CustomerService.data": "",
    "ITInfrastructure.assets": "",
    "ITInfrastructure.security": "",
    "Legal.documents": "",
    "Legal.compliance": "",
    "OtherPlatforms.details": "",
  };
};
