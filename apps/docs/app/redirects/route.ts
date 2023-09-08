import { allDocs, allApis } from "contentlayer/generated";

export interface RedirectEntry {
  redirect_from?: string[];
  slug: string;
  anchor_redirects?: { redirect_from: string[]; target: string }[];
}

export function GET() {
  const apiReferenceEntries = allApis.map((entry) => {
    const { slug, ...rest } = entry;
    return { slug: `api-reference/${slug}`, ...rest };
  });
  const redirectEntries = [...allDocs, ...apiReferenceEntries]
    .filter(
      (doc) =>
        !doc.unpublished && !doc.slug.includes("_test") && doc.redirect_from
    )
    .map((doc) => {
      const { redirect_from, slug, anchor_redirects } = doc;
      return { redirect_from, slug, anchor_redirects };
    });

  return new Response(JSON.stringify({ redirectEntries }), {
    status: 200,
  });
}
