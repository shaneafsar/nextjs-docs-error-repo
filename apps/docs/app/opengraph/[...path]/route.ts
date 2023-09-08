import { NextRequest } from "next/server";
import { generateOpenGraphImage } from "integrations/open-graph";
import { DEPLOYMENT_URL, OPENGRAPH_DEFAULT_TITLE } from "@constants";

export const runtime = "edge";

// https://github.com/vercel/next.js/issues/49630#issuecomment-1562708047
export async function GET(request: NextRequest) {
  const urlSearchParams = new URLSearchParams(new URL(request.url).search);
  const title = urlSearchParams.get("title") as string;

  const path = `${DEPLOYMENT_URL}/opengraph/titles.json`;

  const res = await fetch(path);
  const titleOutput = await res.json();

  if (titleOutput?.titles?.indexOf(title) > -1) {
    return generateOpenGraphImage(title);
  }
  return generateOpenGraphImage(OPENGRAPH_DEFAULT_TITLE);
}
