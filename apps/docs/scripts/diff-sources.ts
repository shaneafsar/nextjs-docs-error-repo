import { writeFile } from "fs/promises";
import path from "path";
import { xml2json } from "xml-js";
import redirects from "../redirects";

const diffSitemaps = async () => {
  const oldSitemap = await fetch("https://www.algolia.com/doc/sitemap.xml")
    .then((res) => res.text())
    .then((res) =>
      Promise.resolve(xml2json(res, { compact: true })).then((res) =>
        JSON.parse(res).urlset.url.map(
          (url) => url.loc._text.split("algolia.com/doc")[1]
        )
      )
    );

  await writeFile(
    path.resolve(".output", "old-sitemap.json"),
    JSON.stringify({ oldSitemap }, null, 2)
  );

  const newSitemap = await fetch("https://www.algolia.com/doc-beta/sitemap.xml")
    .then((res) => res.text())
    .then((res) =>
      Promise.resolve(xml2json(res, { compact: true })).then((res) =>
        JSON.parse(res).urlset.url.map(
          (url) => `${url.loc._text.split("algolia.com/doc-beta")[1]}/`
        )
      )
    );

  await writeFile(
    path.resolve(".output", "new-sitemap.json"),
    JSON.stringify({ newSitemap }, null, 2)
  );

  const oldSitemapWithRedirects = oldSitemap.filter((entry) => {
    return !redirects.find(
      (redirectEntry) => `${redirectEntry.source}/` === entry
    );
  });

  const entriesWithoutRedirects = oldSitemapWithRedirects.filter((entry) => {
    return !newSitemap.includes(entry);
  });

  await writeFile(
    path.resolve(".output", "entries-without-redirects.json"),
    JSON.stringify({ entriesWithoutRedirects }, null, 2)
  );

  return `There are ${entriesWithoutRedirects.length} entries without redirects`;
};

diffSitemaps().then(console.log);
