export const AUTH_URL = "https://dashboard.algolia.com/static/current_user";
export const APPLICATIONS_URL =
  "https://dashboard.algolia.com/api/1/applications/";
export const SIGN_IN_URL = "https://dashboard.algolia.com/users/sign_in";
export const DASHBOARD_URL = "https://dashboard.algolia.com/";
export const ZENDESK_API_URL = "https://algolia.zendesk.com/api/v2/tickets";
export const TEST_ENV_BASE_URL = "http://localhost:3000/test";

export const baseUrl = process.env.TEST
  ? TEST_ENV_BASE_URL
  : process.env.NEXT_PUBLIC_BASE_PATH;

export const PRODUCTION_DEPLOYMENT_URL = `https://www.algolia.com${process.env.NEXT_PUBLIC_BASE_PATH}`;
export const IS_PREVIEW_DEPLOYMENT = process.env.VERCEL_ENV === "preview";
export const IS_PRODUCTION_DEPLOYMENT = process.env.VERCEL_ENV === "production";

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const DEPLOYMENT_URL = IS_DEVELOPMENT
  ? `http://localhost:3000${process.env.NEXT_PUBLIC_BASE_PATH}`
  : IS_PREVIEW_DEPLOYMENT
  ? `https://${process.env.VERCEL_URL}${process.env.NEXT_PUBLIC_BASE_PATH}`
  : PRODUCTION_DEPLOYMENT_URL;

export const OPENGRAPH_DEFAULT_TITLE =
  "Explore guides, examples, and references for building search and discovery experiences with Algolia.";
export const OPENGRAPH_API_REFERENCE_DEFAULT_TITLE = "API Reference";
