import {
  contentType,
  generateOpenGraphImage,
  size,
} from "integrations/open-graph";
import { OPENGRAPH_API_REFERENCE_DEFAULT_TITLE } from "@constants";

export const runtime = "edge";

export { contentType, size };

// Image generation
export default async function Image() {
  return generateOpenGraphImage(OPENGRAPH_API_REFERENCE_DEFAULT_TITLE);
}
