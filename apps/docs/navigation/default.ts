import type { NavigationGroup } from "@ts/navigation";

const navigation: NavigationGroup[] = [
  {
    title: "API Reference",
    href: "/api-reference/",
    topLevelSection: "reference",
    match: /^\/api-reference/,
    links: [
      {
        title: "Search",
        isSpecPage: true,
        href: "/api-reference/search",
      },
      {
        title: "Recommend",
        isSpecPage: true,
        href: "/api-reference/recommend",
      },
      {
        title: "A/B Testing",
        isSpecPage: true,
        href: "/api-reference/ab-test",
      },
      {
        title: "Analytics",
        isSpecPage: true,
        href: "/api-reference/analytics",
      },
      {
        title: "Ingestion",
        isSpecPage: true,
        href: "/api-reference/ingestion",
      },
      {
        title: "Insights",
        isSpecPage: true,
        href: "/api-reference/insights",
      },
      {
        title: "Personalization",
        isSpecPage: true,
        href: "/api-reference/personalization",
      },
      {
        title: "Query Suggestions",
        isSpecPage: true,
        href: "/api-reference/query-suggestions",
      },
    ],
  },
  {
    title: "Getting started",
    topLevelSection: "getting-started",
    match: /^\/guides\/getting-started/,
    links: [
      {
        title: "What is Algolia?",
        href: "/guides/getting-started/what-is-algolia/",
      },
      {
        title: "NeuralSearch",
        href: "/guides/getting-started/neuralsearch/",
      },
      {
        title: "How Algolia works",
        href: "/guides/getting-started/how-algolia-works/",
        links: [
          {
            title: "Algolia's ecosystem",
            href: "/guides/getting-started/how-algolia-works/in-depth/ecosystem/",
          },
          {
            title: "Algolia's features",
            href: "/guides/getting-started/how-algolia-works/in-depth/features/",
          },
        ],
      },
      {
        title: "Quick start",
        href: "/guides/getting-started/quick-start/",
        links: [
          {
            title: "Get started with the dashboard",
            href: "/guides/getting-started/quick-start/tutorials/getting-started-with-the-dashboard/",
          },
          {
            title: "Track usage and performance in the dashboard",
            href: "/guides/getting-started/quick-start/tutorials/account-metrics-with-the-dashboard/",
          },
          {
            title: "Quickstart with the PHP API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/php/",
          },
          {
            title: "Quickstart with the Ruby API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/ruby/",
          },
          {
            title: "Quickstart with the JavaScript API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/javascript/",
          },
          {
            title: "Quickstart with the Python API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/python/",
          },
          {
            title: "Quickstart with the Swift API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/swift/",
          },
          {
            title: "Quickstart with the Kotlin API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/kotlin/",
          },
          {
            title: "Quickstart with the .NET API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/csharp/",
          },
          {
            title: "Quickstart with the Java API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/java/",
          },
          {
            title: "Quickstart with the Go API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/go/",
          },
          {
            title: "Quickstart with the Scala API client",
            href: "/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/scala/",
          },
        ],
      },
    ],
  },
  {
    title: "Sending and managing data",
    topLevelSection: "guides",
    match: /^\/guides\/sending-and-managing-data/,
    links: [
      {
        title: "Format and structure your data",
        href: "/guides/sending-and-managing-data/prepare-your-data/",
        links: [
          {
            title: "Setting searchable attributes",
            href: "/guides/sending-and-managing-data/prepare-your-data/how-to/setting-searchable-attributes/",
          },
          {
            title: "Creating and using nested attributes",
            href: "/guides/sending-and-managing-data/prepare-your-data/how-to/creating-and-using-nested-attributes/",
          },
          {
            title: "Reducing record size",
            href: "/guides/sending-and-managing-data/prepare-your-data/how-to/reducing-object-size/",
          },
          {
            title: "Handling data relationships",
            href: "/guides/sending-and-managing-data/prepare-your-data/how-to/handling-data-relationships/",
          },
          {
            title: "Indexing long documents",
            href: "/guides/sending-and-managing-data/prepare-your-data/how-to/indexing-long-documents/",
          },
          {
            title: "Creating parent-child relationships",
            href: "/guides/sending-and-managing-data/prepare-your-data/how-to/parent-child-relationships/",
          },

          {
            title: "Preparing your data for indexing",
            href: "/guides/sending-and-managing-data/prepare-your-data/in-depth/prepare-data-in-depth/",
          },
          {
            title: "What is in a record",
            href: "/guides/sending-and-managing-data/prepare-your-data/in-depth/what-is-in-a-record/",
          },
          {
            title: "Data sanitization",
            href: "/guides/sending-and-managing-data/prepare-your-data/in-depth/data-sanitization/",
          },
          {
            title: "Data, record size, and usage limits",
            href: "/guides/sending-and-managing-data/prepare-your-data/in-depth/index-and-records-size-and-usage-limitations/",
          },
        ],
      },
      {
        title: "Send and update your data",
        href: "/guides/sending-and-managing-data/send-and-update-your-data/",
        links: [
          {
            title: "Importing from the dashboard",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-from-the-dashboard/",
          },
          {
            title: "Importing with no-code connectors",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-no-code-connectors/",
          },
          {
            title: "Importing with the API",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/",
          },
          {
            title: "Incremental updates",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/how-to/incremental-updates/",
          },
          {
            title: "Sending records in batches",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/how-to/sending-records-in-batches/",
          },

          {
            title: "Different synchronization strategies",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/in-depth/the-different-synchronization-strategies/",
          },
          {
            title: "Index operations are asynchronous",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/in-depth/index-operations-are-asynchronous/",
          },
          {
            title: "Handling concurrency with versioning",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/in-depth/handling-concurrency-with-versioning/",
          },

          {
            title: "Search Parse.com data",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/tutorials/parse-algolia/",
          },
          {
            title: "Search Salesforce data",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/tutorials/salesforce-algolia/",
          },
          {
            title: "Searching Confluence data",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/tutorials/confluence-algolia/",
          },
          {
            title: "Searching Google Drive",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/tutorials/google-drive-algolia/",
          },
          {
            title: "Search Jira data",
            href: "/guides/sending-and-managing-data/send-and-update-your-data/tutorials/jira-algolia/",
          },
        ],
      },

      {
        title: "Manage indices",
        href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/",
        links: [
          {
            title: "Export and import indices",
            href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/export-import-indices/",
          },
          {
            title: "Move indices",
            href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices/",
          },
          {
            title: "Copy indices",
            href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices/",
          },
          {
            title: "Delete indices",
            href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/delete-indices/",
          },

          {
            title: "Choosing between one or more indices",
            href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/concepts/one-or-more-indices/",
          },
          {
            title: "Indices and analytics",
            href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/concepts/indices-analytics/",
          },
          {
            title: "Generate a sitemap from an Algolia index",
            href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/tutorial/generate-sitemap-from-index/",
          },
        ],
      },
      {
        title: "Manage your Algolia apps",
        href: "/guides/sending-and-managing-data/manage-indices-and-apps/manage-your-apps/",
      },
    ],
  },
];

export default navigation;
