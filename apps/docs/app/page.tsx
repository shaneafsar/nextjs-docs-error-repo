import { ArrowRight } from "react-feather";

import Hero from "@components/Hero";

import Heading from "@components/Heading";
import ProductCard from "@components/ProductCard";
import Link from "next/link";

const linkClasses = `
  text-xenon-600
  hover:text-xenon-300
  transition-colors
  duration-200
  ease-in-out
  dark:text-xenon-300
  dark:hover:text-xenon-200
  hover:underline
  underline-offset-4
  mb-4
  md:mb-1
`;

export default async function Page() {
  return (
    <div
      className="relative mx-auto max-w-4xl lg:gap-10"
      data-testid="home-page"
    >
      <Hero
        title="Algolia Docs"
        ctas={[
          {
            url: "/guides/getting-started/what-is-algolia",
            title: "Get Started",
          },
        ]}
        image="https://res.cloudinary.com/dfzftvkli/image/upload/v1686096583/search-api-graphic2.webp"
      >
        Algolia is a platform for building powerful end-to-end search and
        discovery solutions.
      </Hero>

      <Heading
        tag="h2"
        className="mb-2 text-3xl font-bold tracking-tight dark:text-white"
      >
        Build your search and discovery experience
      </Heading>
      <p className="mb-8">Index your world and put content in motion!</p>

      <div className="relative z-10 mb-16 flex flex-col justify-between gap-7 md:flex-row">
        <Link
          className="w-full"
          href="/guides/sending-and-managing-data/prepare-your-data"
        >
          <ProductCard
            title="Connect your data"
            description="Format your data for search and upload it to Algolia."
            bottom="Learn more"
          />
        </Link>
        <Link
          className="w-full"
          href="/guides/building-search-ui/what-is-instantsearch/js"
        >
          <ProductCard
            title="Build your UI"
            description="Build relevant, fast, and engaging user experiences for search and navigation using Algolia's InstantSearch and Autocomplete UI libraries."
            bottom="Learn more"
          />
        </Link>
        <Link
          className="w-full"
          href="/guides/managing-results/relevance-overview"
        >
          <ProductCard
            title="Optimize relevance"
            description="Tune your index settings to return the most relevant results first."
            bottom="Learn more"
          />
        </Link>
      </div>
      <hr className="mb-8" />
      <div className="mb-16">
        <Heading tag="h2" className="mb-2 text-3xl font-bold tracking-tight">
          Explore libraries and integrations
        </Heading>
        <p className="mb-4">
          Algolia provides a whole ecosystem built around powerful APIs.
        </p>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/4">
            <Heading tag="h3" className="mb-2 font-bold" id="#integrations">
              Integrations
            </Heading>
            <ul>
              <li className={linkClasses}>
                <Link href="/integration/shopify/getting-started/quick-start">
                  Shopify
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="/integration/magento-2/getting-started/quick-start">
                  Adobe Commerce/Magento
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="/integration/salesforce-commerce-cloud-b2c/getting-started/introduction">
                  Salesforce B2C Commerce
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="/integrations">
                  Show all <ArrowRight className="inline-block w-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <Heading tag="h3" className="mb-2 font-bold" id="#sdks">
              SDKs
            </Heading>
            <ul>
              <li className={linkClasses}>
                <Link href="https://www.algolia.com/doc/api-client/getting-started/install/javascript">
                  JavaScript
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="https://www.algolia.com/doc/api-client/getting-started/install/php">
                  PHP
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="/framework-integration/rails/getting-started/setup">
                  Ruby on Rails
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="/libraries">
                  Show all SDKs <ArrowRight className="inline-block w-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <Heading tag="h3" className="mb-2 font-bold" id="#ui-libraries">
              UI libraries
            </Heading>
            <ul>
              <li className={linkClasses}>
                <Link href="/api-reference/widgets/js">InstantSearch</Link>
              </li>
              <li className={linkClasses}>
                <Link href="/ui-libraries/autocomplete/introduction/what-is-autocomplete">
                  Autocomplete
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="/ui-libraries/recommend/introduction/what-is-recommend">
                  Recommend UI
                </Link>
              </li>
              <li className={linkClasses}>
                <Link href="/ui-libraries">
                  Show all UI libraries{" "}
                  <ArrowRight className="inline-block w-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <Heading tag="h3" className="mb-2 font-bold" id="#api-reference">
              API reference
            </Heading>
            <ul>
              <li className={linkClasses}>
                <Link href="/api-reference/search">Search API</Link>
              </li>
              <li className={linkClasses}>
                <Link href="/api-reference/recommend">Recommend API</Link>
              </li>
              <li className={linkClasses}>
                <Link href="/api-reference/ingestion">Ingestion API</Link>
              </li>
              <li className={linkClasses}>
                <Link href="/api-reference">
                  Show all APIs <ArrowRight className="inline-block w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="mb-8" />
      <div>
        <Heading tag="h2" className="mb-2 text-3xl font-bold tracking-tight">
          Expand your search
        </Heading>
        <p className="mb-8">
          Harness the power of Algolia&apos;s AI models to personalize results and
          build individualized search and discovery experiences your users will
          love!
        </p>

        <div className="relative z-10 mb-16 flex flex-col justify-between gap-7 md:flex-row">
          <Link className="w-full" href="/guides/getting-started/neuralsearch">
            <ProductCard
              type="glow"
              title="Algolia NeuralSearch"
              description="Combine the speed of keyword search with the semantic understanding delivered by AI."
              bottom="About NeuralSearch"
            />
          </Link>
          <Link
            className="w-full"
            href="/guides/personalization/what-is-personalization"
          >
            <ProductCard
              title="Personalization"
              description="Customized smarter Search & Discovery experiences"
              bottom="About Personalization"
            />
          </Link>
          <Link className="w-full" href="/guides/algolia-recommend/overview">
            <ProductCard
              type="red"
              title="Recommend"
              description="Flexible, hosted recommendation API with advanced programmatic control"
              bottom="About Recommend"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
