import { v4 as uuid } from "uuid";
import { cookieExists } from "@utils/cookieExists";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  if (cookieExists("anonymous_id", req.headers.get("Cookie"))) {
    return new Response("ew! that's expired! don't eat that!", {
      status: 200,
      headers: {
        "Set-Cookie": `anonymous_id=${uuid()}; expires=Sat, 20 Jan 1980 12:00:00 UTC; SameSite=Lax; Path=/;  `,
      },
    });
  }

  return new Response("move along", {
    status: 200,
  });
};
