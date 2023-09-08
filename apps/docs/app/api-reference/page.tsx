import Callout from "@components/Callout";
import Heading from "@components/Heading";
import { allApis } from "contentlayer/generated";
import Link from "next/link";
import { paramCase } from "param-case";
import { ArrowUpRight } from "react-feather";

export const dynamic = "force-static";

const publishedApis = allApis.filter((api) => !api.unpublished);

export async function generateStaticParams() {
  return publishedApis.map((api) => api.slug);
}

export default async function ApiReferencePage({ params }) {
  return (
    <div className="relative mx-auto max-w-4xl lg:gap-10 lg:py-10">
      <Heading
        tag="h1"
        className="mb-5 text-5xl font-bold tracking-tight"
        id="api-reference"
      >
        API Reference
      </Heading>
      <Callout type="warning" title="Important">
        <p>
          The Algolia{" "}
          <a
            href="https://www.algolia.com/policies/sla/#invoice-credit-terms-and-conditions:~:text=In%20order%20for%20a%20Subscriber%20to%20be%20eligible%20to%20receive%20a%20credit%20under%20this%20SLA%2C%20the%20Subscriber%20must%20use%20the%20latest%20version%20of%20Algolia%20API%20Clients%20and%20ensure%20that%20the%20retry%20strategy%20is%20implemented%20strictly%20following%20the%20guidelines%20of%20Algolia%E2%80%99s%20REST%20API%20documentation%20located%20at%20www.algolia.com/doc/rest"
            target="_blank"
            className="text-xenon-600 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-xenon-300 hover:underline dark:text-xenon-300 dark:hover:text-xenon-200"
          >
            Service Level Agreement
            <ArrowUpRight className="inline h-3 w-3"></ArrowUpRight>
          </a>{" "}
          doesn&apos;t cover using the REST APIs directly.
        </p>
      </Callout>
      <div className="mb-16 grid grid-cols-12 gap-4">
        {publishedApis.map((api) => {
          return (
            <Link
              key={api.slug}
              href={`/api-reference/${api.slug}`}
              className="border-1 col-span-12 flex w-full items-center justify-center rounded-lg border px-8 py-12 transition-all hover:bg-gray-100 hover:dark:bg-gray-700 md:col-span-4"
            >
              <Heading
                tag="h3"
                className="!text-md !m-0 text-center font-bold dark:text-white"
              >
                {api.title}
              </Heading>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
