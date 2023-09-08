export type Profiles = {
  [name: string]: Profile;
};

export type Profile = {
  appId?: string;
  name?: string;
  adminApiKey?: string;
  isDefault: boolean;
  defaultIndexName: string;
};
