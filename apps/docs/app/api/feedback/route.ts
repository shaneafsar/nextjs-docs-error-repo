import { ZENDESK_API_URL } from "@constants";
import isbot from "isbot";

import type { Feedback } from "@components/Feedback";
import * as Sentry from "@sentry/node";
import { cors } from "@utils/cors";

export const dynamic = "force-dynamic";

export const POST = cors(async (request: Request) => {
  const userAgent = request.headers.get("User-Agent");

  if (isbot(userAgent)) {
    return new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  try {
    const properties: Feedback = await request.json();
    if (
      !properties.sentiment &&
      !["positive", "negative"].includes(properties.sentiment!)
    ) {
      return new Response(null, {
        status: 422,
        statusText: "Invalid sentiment provided",
      });
    }

    if (properties.text) {
      await fetch(ZENDESK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.ZENDESK_API_TOKEN}`,
        },
        body: JSON.stringify({
          ticket: {
            priority: "Normal",
            subject: "New docs feedback",
            collaborators: [],
            comment: {
              html_body: `
              <p>Sentiment: ${properties.sentiment}</p>
              <p>Feedback: ${properties.text}</p>
              <p>Sent from: <a href="${properties.url}">${properties.url}</a></p>`,
            },
            tags: ["doc-feedback"],
          },
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    Sentry.captureException(err);

    return new Response(null, {
      status: 500,
      statusText: "Internal server error",
    });
  }
});
