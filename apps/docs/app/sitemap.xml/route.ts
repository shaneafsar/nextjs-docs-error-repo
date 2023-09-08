import { allDocs, allApis, allMethods } from "contentlayer/generated";
import { PRODUCTION_DEPLOYMENT_URL } from "@constants";

/**
 * Preview URLs will include an extra slash (NEXT_PUBLIC_VERCEL_URL includes the trailing slash)
 * NEXT_PUBLIC_BASE_PATH is also expected to include the starting slash (e.g "/docs" instead of just "docs")
 */
const URL = PRODUCTION_DEPLOYMENT_URL;

function generateSiteMap(routes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${URL}</loc>
    </url>
     ${routes
       .map((pageUrl) => {
         return `
           <url>
               <loc>${pageUrl}</loc>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export function GET() {
  const pagesRoutes = allDocs
    .filter((doc) => !doc.unpublished || !doc.no_index)
    .map((doc) => `${URL}/${doc.slug}`)
    .filter((url) => !url.includes("deprecated/") || !url.includes("_test"));

  const apiRoutes = allApis.map((doc) => `${URL}/api-reference/${doc.slug}`);
  pagesRoutes.concat(apiRoutes);

  const body = generateSiteMap(pagesRoutes);

  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}
