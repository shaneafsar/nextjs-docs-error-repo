import clsx from "clsx";
import * as React from "react";

import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";

import Callout from "@components/Callout";
import CodeSnippet from "@components/CodeSnippet";
import { CodeSnippetGroup } from "@components/CodeSnippetGroup";
import Echo from "@components/Echo";
import Feedback from "@components/Feedback";
import FilteredContent from "@components/FilteredContent";
import Grid from "@components/Grid";
import ProductCard from "@components/ProductCard";
import Heading from "@components/Heading";
import Hero from "@components/Hero";
import Icon from "@components/Icon";
import InteractiveExample from "@components/InteractiveExample";
import LogoGrid from "@components/LogoGrid";
import Media from "@components/Media";
import Gate from "@components/Gate";
import Property, { Code, Description } from "@components/Property";
import Tabs from "@components/Tabs/Tab";
import TabPanel from "@components/Tabs/TabPanel";
import Var from "@components/Var";
import Widget from "@components/Widget";
import { ArrowUpRight } from "react-feather";
import { LinkWithTelemetry } from "./LinkWithTelemetry";

const components = {
  h1: (props) => <Heading tag="h1" {...props} />,
  h2: (props) => <Heading tag="h2" {...props} />,
  h3: (props) => <Heading tag="h3" {...props} />,
  h4: (props) => <Heading tag="h4" {...props} />,
  h5: (props) => <Heading tag="h5" {...props} />,
  h6: (props) => <Heading tag="h6" {...props} />,
  a: ({ className, ...props }) => {
    const isExternalLink =
      props.href.startsWith("http") || props.href.startsWith("www.");
    const classNames = clsx(
      "text-xenon-600 hover:text-xenon-300 transition-colors duration-200 ease-in-out dark:text-xenon-300 dark:hover:text-xenon-200 hover:underline underline-offset-4",
      className
    );

    if (isExternalLink) {
      return (
        <LinkWithTelemetry
          className={clsx(classNames, "inline-flex items-center")}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          <span>{props.children}</span>
          <ArrowUpRight className="mb-1 h-3 w-3"></ArrowUpRight>
        </LinkWithTelemetry>
      );
    }

    // check if the link contains `/api-clients/`, `/api-methods/`, `/api-parameters/`, `/tools/crawler/`
    // any non migrated links
    const isAPIReference =
      props.href.includes("/api-clients/") ||
      props.href.includes("/api-methods/") ||
      props.href.includes("/api-parameters/") ||
      props.href.includes("/autocomplete/api-reference/") ||
      props.href.includes("tools/crawler/apis/configuration");

    if (isAPIReference) {
      return (
        <LinkWithTelemetry
          className={classNames}
          href={`https://algolia.com/doc${props.href}`}
        >
          {props.children}
        </LinkWithTelemetry>
      );
    }

    return (
      <LinkWithTelemetry className={classNames} href={props.href}>
        {props.children}
      </LinkWithTelemetry>
    );
  },
  p: ({ className, ...props }) => (
    <p
      className={clsx(
        "max-w-prose leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={clsx("not-prose my-6 max-w-prose list-disc", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={clsx("not-prose my-6 max-w-prose list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={clsx("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={clsx(
        "[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={clsx("rounded-md border", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr
      className="my-4 border-gray-300 dark:border-xenon-800 md:my-8"
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full max-w-none overflow-y-auto">
      <table className={clsx("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={clsx("even:bg-muted m-0 border-t p-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={clsx(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={clsx(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => <React.Fragment {...props} />, // Already handled with shiki and code snippets integration,
  code: ({ className, ...props }) => {
    return (
      <code
        className={clsx(
          "relative whitespace-pre-wrap rounded bg-slate-200/60 px-[0.3rem] py-[0.1rem] font-mono text-[0.85em] leading-5 dark:bg-slate-500/20",
          className
        )}
        {...props}
      />
    );
  }, // Already handled with shiki and code snippets integration
  CodeSnippet,
  Callout,
  Feedback,
  Hero,
  Icon,
  Media,
  Grid,
  LogoGrid,
  Widget,
  Property,
  Code,
  Description,
  Image,
  CodeSnippetGroup,
  Tabs,
  ProductCard,
  TabPanel,
  InteractiveExample,
  Echo,
  Var,
  Gate,
  FilteredContent,
};

interface MdxProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component className={clsx(className)} components={components} />;
}
