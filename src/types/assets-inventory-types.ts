export type NestedAssetInventory = {
  Software: {
    licenses: string;
    usage: string;
  };
  Engineering: {
    platforms: string;
    tools: string;
  };
  Databases: {
    types: string;
    access: string;
  };
  Financial: {
    platforms: string;
    data: string;
  };
  CustomerService: {
    channels: string;
    data: string;
  };
  ITInfrastructure: {
    assets: string;
    security: string;
  };
  Legal: {
    documents: string;
    compliance: string;
  };
  OtherPlatforms: {
    details: string;
  };
};