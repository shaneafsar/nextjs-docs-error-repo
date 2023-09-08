import {
  defineDocumentType,
  makeSource,
  defineNestedType,
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import { remarkCodeSnippets } from "./integrations/code-snippets";
import { rehypeInteractiveExamples } from "./integrations/interactive-examples";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  description: "Base document type",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
      description: "Page h1 and title metadata.",
    },
    slug: {
      type: "string",
      required: true,
      description: "Page URL (independent from the filename).",
    },
    description: {
      type: "string",
      required: true,
      description: "Page lede and description metadata.",
    },
    navigation: {
      type: "string",
      default: "default",
      description: "Deprecated.",
    },
    gate: {
      type: "string",
      description:
        "The gate that must be passed to access this page needs to a string that matches the GateType", // see @ts/gate for the an enum of available gates
    },
    unpublished: {
      type: "boolean",
      default: false,
      description: "Indicates whether a page should NOT be published.",
    },
    no_index: {
      type: "boolean",
      default: false,
      description:
        "Indicates that a page is published but NOT present in sitemap and not indexed.",
    },
    redirect_from: {
      type: "list",
      of: {
        type: "string",
      },
      description: "List of old URLs that will be redirected to `slug`.",
    },
    anchor_redirects: {
      type: "list",
      of: AnchorRedirects,
      description:
        "List of old URLs with anchors that will be redirected to `slug`.",
    },
    // These are temporary extra fields that may occur in the UI libraries section
    // We should create separate collections for different types of content after cleaning up.
    flavor: {
      type: "enum",
      options: ["android", "angular", "flutter", "ios", "js", "react", "vue"],
      description: "The InstantSearch variant.",
    },
    short_description: {
      type: "string",
      description: "Deprecated. Use the `description` field instead.",
    },
    storybook_link: {
      type: "string",
      description: "URL to the Storybook page for an InstantSearch widget.",
    },
    demo_link: {
      type: "string",
      description: "URL to a demo for a widget or component.",
    },
    sandpack_link: {
      type: "string",
      description: "Link to an interactive code sandbox.",
    },
  },
}));

export const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: `snippets/**/*.mdx`,
  contentType: "mdx",
}));

const AnchorRedirects = defineNestedType(() => ({
  name: "AnchorRedirects",
  fields: {
    redirect_from: { type: "list", of: { type: "string" }, required: true },
    target: { type: "string", required: true },
  },
}));

export const Api = defineDocumentType(() => ({
  name: "Api",
  filePathPattern: `api-reference/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    specUrl: {
      type: "string",
      required: true,
    },
    excludePaths: {
      type: "list",
      required: true,
      of: {
        type: "string",
      },
    },
    excludeTagGroups: {
      type: "list",
      required: true,
      of: {
        type: "string",
      },
    },
    additionalMethods: {
      type: "list",
      required: true,
      of: {
        type: "string",
      },
    },
    slug: {
      type: "string",
      required: true,
    },
    unpublished: {
      type: "boolean",
      default: false,
    },
    no_index: {
      type: "boolean",
      default: false,
      description:
        "Indicates that a page is published but NOT present in sitemap and not indexed.",
    },
    redirect_from: {
      type: "list",
      of: {
        type: "string",
      },
    },
    anchor_redirects: {
      type: "list",
      of: AnchorRedirects,
    },
  },
}));

export const Method = defineDocumentType(() => ({
  name: "Method",
  filePathPattern: `methods/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
    unpublished: {
      type: "boolean",
      default: false,
    },
    no_index: {
      type: "boolean",
      default: false,
      description:
        "Indicates that a page is published but NOT present in sitemap and not indexed.",
    },
  },
}));

export default makeSource(async () => ({
  contentDirPath: "./content",
  documentTypes: [Doc, Api, Method, Snippet],
  mdx: {
    rehypePlugins: [rehypeSlug, rehypeInteractiveExamples],
    remarkPlugins: [
      remarkGfm,
      [remarkSmartypants, { dashes: "oldschool" }],
      await remarkCodeSnippets(),
    ],
  },
}));
