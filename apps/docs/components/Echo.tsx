import { allSnippets } from "contentlayer/generated";
import { Mdx } from "./MDXComponents";

type Props = {
  name: string;
};

function Echo({ name }: Props) {
  const snippet = allSnippets.find(
    (snippet) => snippet._raw.flattenedPath.replace("snippets/", "") === name
  );
  if (!snippet) {
    throw new Error(`No snippet found for name "${name}"`);
  }

  return <Mdx code={snippet.body.code} />;
}

export default Echo;
