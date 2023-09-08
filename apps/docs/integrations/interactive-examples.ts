import { visit } from "unist-util-visit";
import fs from "fs";
import path from "path";

import type { UnistNode, UnistTree } from "./types/unist";

export function rehypeInteractiveExamples() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.name !== "InteractiveExample") return;

      const { value: files } = getNodeAttributeByName(node, "files") || {};

      if (!files) {
        return;
      }

      const parsedFiles: Record<string, string> = parseFilesToJson(files.value);

      const newFilesParams: Record<string, string> = Object.entries(
        parsedFiles
      ).reduce((acc, [filename, src]) => {
        // Read the file source becuase Sandpack expects a string instead of file path
        const fileSource = getFileSource(src);

        return {
          ...acc,
          [filename]: fileSource,
        };
      }, {});

      const filesAttributeIndex = node.attributes?.findIndex(
        (attr) => attr.name === "files"
      );

      // TODO: Figure out how to build a new node attribute so that we can return JSON instead of a string for the files
      if (filesAttributeIndex) {
        // Overwrite the files attribute with the newly parsed files
        node.attributes?.splice(filesAttributeIndex, 1, {
          type: "mdxJsxAttribute",
          name: "files",
          value: JSON.stringify(newFilesParams),
        });
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attr) => attr.name === name);
}

function parseFilesToJson(files: string) {
  const formattedString = files
    .split("\n")
    .join("")
    // Regex to remove extra whitespace, trailing commas, and extra single quotes
    .replace(/,\s*([\]}])/g, "$1");

  return JSON.parse(formattedString);
}

function getFileSource(source: string) {
  return fs.readFileSync(path.join(process.cwd(), source), "utf8");
}
