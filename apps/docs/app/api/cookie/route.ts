import { v4 as uuid } from "uuid";
import { cookieExists } from "@utils/cookieExists";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  if (cookieExists("anonymous_id", req.headers.get("Cookie"))) {
    return new Response("move along", {
      status: 200,
    });
  }

  return new Response("take a cookie", {
    status: 200,
    headers: { "Set-Cookie": `anonymous_id=${uuid()}; SameSite=Lax; Path=/;` },
  });
};
