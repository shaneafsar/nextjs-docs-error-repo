import { remark } from "remark";
import { toc } from "mdast-util-toc";
import type { Node } from "mdast-util-toc/lib";
import { visit } from "unist-util-visit";

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

function flattenNode(node) {
  const p: string[] = [];
  visit(node, (n) => {
    if (!textTypes.includes(n.type)) return;
    p.push(n.value as string);
  });
  return p.join("");
}

export type Item = {
  title: string;
  url: string;
  items?: Item[];
};

type Items = {
  items?: Item[];
};

function getItems(node: Node | null, current): Items {
  if (!node) return {};

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = (item as any).url;
        current.title = flattenNode(item);
      }
    });

    return current;
  }

  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}));

    return current;
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {});

    if (node.children.length > 1) {
      getItems(node.children[1], heading);
    }

    return heading;
  }

  return {};
}

const getToc = () => (node: Node, file: Node) => {
  const table = toc(node);
  file.data = getItems(table.map, {});
};

export type TOC = Items;

export async function getTableOfContents(content: string): Promise<TOC> {
  const result = await remark().use(getToc).process(content);

  return result.data;
}
