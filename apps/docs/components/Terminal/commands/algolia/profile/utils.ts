import type { Profile } from "./types";

const VISITOR_PROFILE: Profile = {
  appId: process.env.NEXT_PUBLIC_CLI_APP_ID,
  name: process.env.NEXT_PUBLIC_CLI_INDEX_NAME,
  adminApiKey: process.env.NEXT_PUBLIC_CLI_API_KEY,
  defaultIndexName: process.env.NEXT_PUBLIC_CLI_INDEX_NAME!,
  isDefault: true,
};

// TO DO: return user profile if logged in
export const getDefaultProfile = () => VISITOR_PROFILE;
