import { writeFile } from "fs/promises";
import JSON5 from "json5";
import { type RedirectEntry } from "app/redirects/route";
import yaml from "yamljs";

/* 
getLegacyRedirects() parses the yaml file containing old world redirects,
and returns a deduplicated array of items
*/
const getLegacyRedirects = (): RedirectEntry[] => {
  const legacyRedirects: { to: string; from: string }[] = yaml.load(
    "./public/legacy-redirects.yml"
  );

  return Array.from(
    new Set(
      legacyRedirects.map((r) => {
        return JSON.stringify({
          redirect_from: [
            r.from.startsWith("/doc/") ? r.from.split("/doc/")[1] : r.from,
          ],
          slug: r.to.startsWith("http") ? r.to : r.to.split("doc/")[1],
        });
      })
    )
  ).map((item) => JSON.parse(item));
};

/*
checkDuplicates() ensures that there is not more than one
occurrence of a redirect and throws an error when one is found.
*/
const checkDuplicates = (redirects: RedirectEntry[]) => {
  const pageRedirectSources = redirects.flatMap((r) => r.redirect_from);

  const anchorRedirectSources = redirects
    .filter((r) => r.anchor_redirects)
    .flatMap((r) => r.anchor_redirects?.flatMap((a) => a.redirect_from));

  anchorRedirectSources.forEach((a) => {
    const anchorRedirectOccurrences = anchorRedirectSources.filter(
      (s) => s === a
    );

    if (anchorRedirectOccurrences.length > 1) {
      throw new Error(
        `An anchor redirect for ${a} exists on multiple documents. Please update.`
      );
    }
  });

  return redirects.forEach((redirect) => {
    const pageRedirectOccurrences = pageRedirectSources.filter(
      (r: string) => redirect.redirect_from?.includes(r)
    );

    if (pageRedirectOccurrences.length > 1) {
      throw new Error(
        `A redirect for ${redirect.redirect_from} exists on multiple documents. Please update.`
      );
    }
  });
};

/*
normalizePath() ensures that leading and trailing slashes
are handled consistently.
*/
const normalizePath = (path: string): string => {
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
};

/* 
getRedirectsFromAlDocs() builds redirect objects that come from the frontmatter
of .mdx files in the repo, as well as from a yaml file of legacy redirects.
*/
const getRedirectsFromAllDocs = async () => {
  const { redirectEntries }: { redirectEntries: RedirectEntry[] } = await fetch(
    "http://localhost:3000/doc-beta/redirects"
  )
    .then((res) => res.json())
    .catch(console.error);

  const legacyRedirects = getLegacyRedirects();

  redirectEntries.push(...legacyRedirects);

  checkDuplicates(redirectEntries);

  return redirectEntries.flatMap((doc) => {
    const pageRedirects = doc.redirect_from?.map((redirect) => {
      return {
        source: normalizePath(redirect),
        destination: normalizePath(doc.slug),
        permanent: true,
      };
    });

    if (!pageRedirects) return;

    if (!doc.anchor_redirects) return pageRedirects;

    const anchorRedirects = doc.anchor_redirects?.flatMap((redirectEntry) => {
      return redirectEntry.redirect_from?.map((redirect) => {
        return {
          source: normalizePath(redirect),
          destination: normalizePath(`${doc.slug}/${redirectEntry.target}`),
          permanent: true,
        };
      });
    });

    return pageRedirects.concat(anchorRedirects);
  });
};

const generateRedirects = async () => {
  const redirects = await getRedirectsFromAllDocs();

  await writeFile(
    "./redirects.js",
    `// THIS FILE IS GENERATED, DO NOT EDIT IT. YOUR CHANGES WILL NOT PERSIST!
module.exports = ${JSON5.stringify(redirects, { space: 2, quote: '"' })}
        `
  );

  console.log(`Generated ${redirects.length} redirects`);
};

generateRedirects();
