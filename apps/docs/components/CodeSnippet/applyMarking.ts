// https://github.com/withastro/docs/blob/main/src/components/CodeSnippet/CodeSnippet.astro

import rangeParser from "parse-numeric-range";
import { ShikiBlock } from "./shiki-block";
import {
  InlineMarkingDefinition,
  LineMarkingDefinition,
  MarkerType,
  MarkerTypeOrder,
} from "./types";

type ApplyMarking = (args: {
  highlightedCodeHtml: string;
  strLineMarkings: string;
  strInlineMarkings: string;
  removedLineIndex: string;
  removedLineCount: string;
}) => string;
const applyMarkings: ApplyMarking = ({
  highlightedCodeHtml,
  strLineMarkings,
  strInlineMarkings,
  removedLineIndex,
  removedLineCount,
}) => {
  const intRemovedLineIndex = parseInt(removedLineIndex) || 0;
  const intRemovedLineCount = parseInt(removedLineCount) || 0;

  const lineMarkings: LineMarkingDefinition[] = parseMarkingDefinition(
    strLineMarkings,
    // Syntax: [mark=|del=|ins=]{2-5,7}
    /^(?:(.*)=){(.+)}$/,
    `Invalid code snippet line marking: Expected a range like "{2-5,7}",
          optionally with one of the prefixes "mark=", "del=" or "ins=", but got "$entry"`
  ).map(({ markerType, groupValues: [content] }) => {
    const lines = rangeParser(content);

    // If any lines were removed during preprocessing,
    // automatically shift marked line numbers accordingly
    const shiftedLines = lines.map((lineNum) => {
      if (lineNum <= intRemovedLineIndex) return lineNum;
      if (lineNum > intRemovedLineIndex + intRemovedLineCount)
        return lineNum - intRemovedLineCount;
      return -1;
    });

    return {
      markerType,
      lines: shiftedLines,
    };
  });

  const inlineMarkings: InlineMarkingDefinition[] = parseMarkingDefinition(
    strInlineMarkings,
    // Syntax for plaintext strings:
    // - Double quotes:   [mark=|del=|ins=]"<Button />"
    // - Single quotes:   [mark=|del=|ins=]'<p class="hi">'
    //
    // Syntax for regular expressions:
    // - Forward slashes: [mark=|del=|ins=]/hi [a-z]+/
    /^(?:(.*)=)([/"'])(.+)\2$/,
    `Invalid code snippet inline marking: Expected either a string in single or double quotes,
          or a RegExp in forward slashes like "/hi [a-z]+/", optionally with one of the prefixes
          "mark=", "del=" or "ins=", but got "$entry"`
  ).map(({ markerType, groupValues: [delimiter, content] }) => {
    let text: string | undefined;
    let regExp: RegExp | undefined;

    if (delimiter === "/") {
      try {
        // Try to use regular expressions with capture group indices
        regExp = new RegExp(content, "gd");
      } catch (error) {
        // Use fallback if unsupported
        regExp = new RegExp(content, "g");
      }
    } else {
      text = content;
    }

    return {
      markerType,
      text,
      regExp,
    };
  });

  const shikiBlock = new ShikiBlock(highlightedCodeHtml);
  shikiBlock.applyMarkings(lineMarkings, inlineMarkings);
  return shikiBlock.renderToHtml();
};

const parseMarkingDefinition = (
  serializedArr: string,
  parts: RegExp,
  parseErrorMsg: string
) =>
  serializedArr
    .split(",")
    .map((entry) => decodeURIComponent(entry))
    .map((entry) => {
      const matches = entry.match(parts);
      let rawMarkerType = matches?.[1];
      // Fix common marker type mistakes
      if (rawMarkerType === "add") rawMarkerType = "ins";
      if (rawMarkerType === "rem") rawMarkerType = "del";
      const markerType = (rawMarkerType as MarkerType) || "mark";
      const isValid = matches && MarkerTypeOrder.includes(markerType);
      if (entry && !isValid) {
        const formattedParseErrorMsg = parseErrorMsg
          .replace("$entry", entry)
          .replace(/\r?\n\s+/g, " ");
        console.error(`*** ${formattedParseErrorMsg}\n`);
      }
      return {
        entry,
        markerType: markerType,
        groupValues: isValid ? matches.slice(2) : [],
      };
    })
    .filter((entry) => entry.groupValues.length);

export default applyMarkings;
