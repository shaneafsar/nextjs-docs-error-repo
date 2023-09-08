import { cors } from "@utils/cors";
import isbot from "isbot";

export interface EventCapture {
  userId?: number;
  anonymousId?: string;
  name: string;
  properties: { [key: string]: any };
}

export const POST = cors(async (request: Request) => {
  const event: EventCapture = await request.json();
  const userAgent = request.headers.get("User-Agent");

  const { name, ...eventProperties } = event;

  if (isbot(userAgent)) {
    return new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return fetch("https://api.segment.io/v1/track", {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.SEGMENT_HTTP_TOKEN}`,
    },
    body: JSON.stringify({
      event: name,
      ...eventProperties,
    }),
  });
});
