import { Col, Properties, Property, Row } from "@components/ApiRoute";
import Feedback from "@components/Feedback";
import Heading from "@components/Heading";
import { Mdx } from "@components/MDXComponents";
import { getPathsByTagGroup, getSpec } from "@utils/api-spec-utils";
import { getOpenGraphImageMetadata } from "integrations/open-graph";
import { allApis, allMethods } from "contentlayer/generated";
import { Metadata } from "next";
import { paramCase } from "param-case";

//export const dynamic = "force-static";

const publishedApis = allApis.filter((api) => !api.unpublished);

export async function generateMetadata({ params }): Promise<Metadata> {
  const api = publishedApis.find((api) => {
    return api.slug === params.slug;
  });

  if (!api) {
    return {};
  }

  const title = api.title;

  const openGraphImage = getOpenGraphImageMetadata(params.slug, api.title);

  return {
    title: api.title,
    openGraph: {
      title: `${api.title} | Algolia Documentation`,
      description: api.title,
      images: [openGraphImage],
    },
    twitter: {
      title: `${api.title} | Algolia Documentation`,
      description: api.title,
      images: [openGraphImage],
    },
    robots: {
      index: api.no_index ? false : true,
    },
  };
}

export async function generateStaticParams() {
  return publishedApis.map((api) => api.slug);
}

function getNavLinksForPage(pathsByTagGroup, slug) {
  return pathsByTagGroup.flatMap((group) =>
    group.paths.flatMap((path) =>
      path.data.map((data) => ({
        href: `/api-reference/${slug}#${paramCase(data.summary)}`,
        tag: data.verb || "",
        title: data.summary || "",
      }))
    )
  );
}

async function getSpecNav({ excludePaths, excludeTagGroups, slug }) {
  const spec = await getSpec(slug);

  const pathsByTagGroup = await getPathsByTagGroup(
    spec,
    excludePaths,
    excludeTagGroups,
    allMethods
  );

  return { slug: slug, links: getNavLinksForPage(pathsByTagGroup, slug) };
}

export default async function ApiReferencePage({ params }) {
  const api = publishedApis.find((api) => {
    return api.slug === params.slug;
  });

  if (!api) return;

  const { slug, title, excludePaths, excludeTagGroups } = api;

  const spec = await getSpec(slug);

  // Prepare data needed to render the page

  const pathsByTagGroup = await getPathsByTagGroup(
    spec,
    excludePaths,
    excludeTagGroups,
    allMethods
  );

  const remainingApis = publishedApis.filter((api) => {
    return api.slug !== params.slug;
  });

  const leftNavLinks = [
    ...(await Promise.all(remainingApis.map(getSpecNav))),
    {
      slug: api.slug,
      links: getNavLinksForPage(pathsByTagGroup, params.slug),
    },
  ];

  return (
    <>
      <div className="page lg:gap-10">
        <div className="col-span-12 grid max-w-none dark:text-gray-200">
          <Heading
            tag="h1"
            className="mb-8 text-4xl capitalize"
            id={paramCase(title)}
          >
            {title}
          </Heading>
          <div className="max-w-2xl">
            <Mdx className=" dark:text-white" code={api.body.code} />
          </div>
          {pathsByTagGroup.map((group) => {
            return (
              <div className="mb-8" key={paramCase(group.name)}>
                <Heading
                  tag="h2"
                  className="mb-8 scroll-mt-24 text-2xl hover:text-blue-500 dark:text-white"
                  id={paramCase(group.name)}
                >
                  {group.name}
                </Heading>
                {group.paths.map((path) => {
                  return (
                    <>
                      {path.data &&
                        path.data.map((data) => {
                          return (
                            <div className="mb-8" key={paramCase(data.summary)}>
                              <Row>
                                <Col>
                                  <div className="flex items-center gap-x-3">
                                    <span className="rounded-lg bg-emerald-400/10 px-1.5 font-mono text-[0.625rem] font-semibold uppercase leading-6 text-emerald-500 ring-1 ring-inset ring-emerald-300 dark:text-emerald-400 dark:ring-emerald-400/30">
                                      {data.verb}
                                    </span>
                                    <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                    <span className="font-mono text-xs text-zinc-400">
                                      {path.name}
                                    </span>
                                  </div>
                                  <Heading
                                    tag="h3"
                                    className="!mt-4 scroll-mt-48 text-xl text-gray-800 hover:text-blue-500 dark:text-white"
                                    id={paramCase(data.summary)}
                                  >
                                    {data.summary}
                                  </Heading>

                                  <p>{data.description}</p>

                                  {data.parameters && (
                                    <Properties>
                                      <Heading
                                        tag="h4"
                                        id="parameters"
                                        className=" text-gray-800"
                                      >
                                        Parameters
                                      </Heading>
                                      {data.parameters.map((p: any) => (
                                        <Property
                                          key={p.name}
                                          name={p.name}
                                          type={p.schema.type}
                                        >
                                          {p.description}
                                        </Property>
                                      ))}
                                    </Properties>
                                  )}
                                </Col>
                                <Col>
                                  {path?.sdkMethods?.body && (
                                    <Mdx
                                      className=""
                                      code={path?.sdkMethods?.body.code}
                                    />
                                  )}
                                </Col>
                              </Row>
                              <hr className="mt-8" />
                            </div>
                          );
                        })}
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>

        <script
          id="spec-nav-data"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(leftNavLinks) }}
        ></script>
      </div>
      <Feedback />
    </>
  );
}
