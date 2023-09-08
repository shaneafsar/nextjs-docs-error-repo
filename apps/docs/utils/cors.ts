import {
  IS_PREVIEW_DEPLOYMENT,
  IS_PRODUCTION_DEPLOYMENT,
  PRODUCTION_DEPLOYMENT_URL,
} from "@constants";

const ALLOWED_ORIGIN = IS_PREVIEW_DEPLOYMENT
  ? `https://${process.env.VERCEL_BRANCH_URL}`
  : IS_PRODUCTION_DEPLOYMENT
  ? "https://www.algolia.com"
  : "http://localhost:3000";

const defaultCorsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

type Handler = (req: Request) => Promise<Response>;

export function cors(handler: Handler) {
  return async (req: Request) => {
    const headers = new Headers(defaultCorsHeaders);
    const reqOrigin = req.headers.get("Origin");

    if (ALLOWED_ORIGIN !== reqOrigin) {
      headers.append("Vary", "Origin");

      headers.set("Content-Length", "0");
      return new Response(null, {
        status: 204,
        headers,
      });
    }

    return await handler(req);
  };
}
