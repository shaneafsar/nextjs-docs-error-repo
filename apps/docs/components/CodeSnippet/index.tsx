import clsx from "clsx";
import parse from "html-react-parser";
import { PropsWithChildren } from "react";
import SnippetHeader from "./SnippetHeader";
import applyMarkings from "./applyMarking";
import "./code-snippet.css";

export interface Props extends PropsWithChildren {
  lang?: string;
  title?: string;
  command?: string;
  removedLineIndex?: string;
  removedLineCount?: string;
  lineMarkings?: string;
  inlineMarkings?: string;
  codeSnippetHtml: string;
}

export default async function CodeSnippet({
  lang = "",
  removedLineIndex = "",
  removedLineCount = "",
  title = "",
  command,
  lineMarkings = "",
  inlineMarkings = "",
  codeSnippetHtml,
}: Props) {
  // Generate HTML code from the title (if any), improving the ability to wrap long file paths
  // into multiple lines by inserting a line break opportunity after each slash
  const titleHtml = decodeURIComponent(title).replace(/([\\/])/g, "$1<wbr/>");

  let customizedCodeSnippetHtml = codeSnippetHtml;

  // Replacing grey[1] from syntax-highlighting-theme.ts with css variable for dark/light mode
  const GRAY_1_REGEX = /#C7C5D3/g;
  const matchingGray = customizedCodeSnippetHtml.matchAll(GRAY_1_REGEX);
  for (const [full] of matchingGray) {
    customizedCodeSnippetHtml = customizedCodeSnippetHtml.replace(
      full,
      "var(--shiki-foreground-primary)"
    );
  }

  // Insert link when "[text](url)" pattern is used in the code
  const MD_LINK_REGEX =
    /&quot;\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)&quot;/g;
  const mdLinks = customizedCodeSnippetHtml.matchAll(MD_LINK_REGEX);
  for (const mdLink of mdLinks) {
    const [full, text, url] = mdLink;
    const linkHtml = `<a href=${url} target="_blank" rel="noopener" class="text-blue-300 underline decoration-blue-300 hover:text-white">${text}</a>`;
    customizedCodeSnippetHtml = customizedCodeSnippetHtml.replace(
      full,
      linkHtml
    );
  }

  // Insert toolip when "[text]:(content):(aria-describedby-value)" pattern is used in the code
  const MD_TOOLTIP_REGEX =
    /&quot;\[([\w\s\d]+)\]\:\(([\w\d ./?=#]+)\):\(([\w\d- ./?=#]+)\)&quot;/g;
  const mdTooltips = customizedCodeSnippetHtml.matchAll(MD_TOOLTIP_REGEX);
  for (const mdTooltip of mdTooltips) {
    const [full, text, content, ariaDescribedBy] = mdTooltip;
    const tooltipHtml = `<div class="relative inline group"><button class="cursor-help" aria-describedby="${ariaDescribedBy}">${text}</button><div class="invisible opacity-0 !absolute px-3 py-2 rounded-md left-0 bottom-full w-fit text-gray-300 bg-xenon-1300 transition ease-in-out duration-300 group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible" role="tooltip">${content}</div></div>`;

    customizedCodeSnippetHtml = customizedCodeSnippetHtml.replace(
      full,
      tooltipHtml
    );
  }

  // Mark lines and expressions (if requested)
  customizedCodeSnippetHtml = applyMarkings({
    highlightedCodeHtml: customizedCodeSnippetHtml,
    strLineMarkings: lineMarkings,
    strInlineMarkings: inlineMarkings,
    removedLineIndex,
    removedLineCount,
  });

  return (
    <figure
      className={clsx([
        "code-snippet not-prose relative mb-8 mt-8 max-w-none rounded-xl bg-gray-100 shadow-sm dark:bg-gray-800",
        titleHtml && "has-title",
        `lang-${lang}`,
      ])}
    >
      <SnippetHeader
        code={codeSnippetHtml}
        title={titleHtml}
        command={command}
      />
      {parse(customizedCodeSnippetHtml)}
    </figure>
  );
}
