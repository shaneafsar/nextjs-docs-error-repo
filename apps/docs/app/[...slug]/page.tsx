import Feedback from "@components/Feedback";
import GitHubSource from "@components/GitHubSource";
import Heading from "@components/Heading";
import { Mdx } from "@components/MDXComponents";
import TOC from "@components/RightSidebar/TOC";
import { getTableOfContents } from "@utils/toc";
import { sora } from "app/fonts";
import clsx from "clsx";
import { allDocs } from "contentlayer/generated";
import { getOpenGraphImageMetadata } from "integrations/open-graph";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { paramCase } from "param-case";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

// for info visit: https://nextjs.org/docs/messages/app-static-to-dynamic-error
// export const dynamic = "force-static";

const publishedDocs = allDocs.filter((doc) => !doc.unpublished);

export async function generateStaticParams() {
  const docsSlugs = publishedDocs.map((doc) => ({
    slug: [doc._raw.flattenedPath],
  }));

  return docsSlugs;
}

function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params.slug?.join("/") || "";
  if (slug === "index")
    return publishedDocs.find((doc) => doc._id === "pages/index.mdx");

  return publishedDocs.find((doc) => doc.slug === slug);
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = getDocFromParams(params);

  if (!doc) {
    return {};
  }

  /**
   * Next's default OpenGraph image functionality does not support passing params to
   * dynamic catch-all routes (e.g. [...slug]). See https://github.com/vercel/next.js/issues/49630#issuecomment-1562708047
   */
  const openGraphImage = getOpenGraphImageMetadata(
    params.slug.join("-"),
    doc.title
  );

  return {
    title: doc.title,
    description: doc.description,
    twitter: {
      title: doc.title,
      description: doc.description,
      images: [openGraphImage],
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      images: [openGraphImage],
    },
    robots: {
      index: doc.no_index ? false : true,
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = getDocFromParams(params);

  if (!doc) {
    return notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <>
      <div className="page lg:gap-10">
        {toc.items && toc.items.length > 0 && (
          <nav slot="mobile-toc" className="mx-auto mb-8 max-w-2xl lg:hidden">
            <TOC headings={toc.items} isMobile={true} />
          </nav>
        )}
        <article className="prose col-span-9 scroll-mt-4 dark:prose-invert">
          <div className="mb-6 max-w-none">
            {doc.slug && (
              <Heading
                tag="h1"
                className="mb-1 max-w-none text-5xl font-bold tracking-tight"
                id={paramCase(doc.title)}
              >
                {doc.title}
                <GitHubSource source={doc._raw.flattenedPath} />
              </Heading>
            )}
            <p className={clsx("mt-4 text-xl leading-relaxed", sora.className)}>
              {doc.description}
            </p>
          </div>
          <Mdx code={doc.body.code} />
          <Feedback />
        </article>
        {toc.items && toc.items.length > 0 && (
          <div className="col-span-3">
            <nav className="fixed top-44 hidden w-60 py-10 lg:block xl:w-64 2xl:right-10 2xl:w-72 2xl:pr-8">
              <TOC headings={toc.items} />
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
