import clsx from "clsx";
import SnippetActionButton from "./SnippetActionButton";
import SnippetLanguageSelect from "./SnippetLanguageSelect";

interface Props {
  /* Title of the code snippet rendered in the header */
  title?: string;
  /* Specifies the command to run with the web cli on "run" button click */
  command?: string;
  /* Specifies the code to copy on "copy" button click */
  code?: string;
  /* Specifies the CodeSandbox url */
  codesandboxUrl?: string;
}

function SnippetHeader({ title, command, code }: Props) {
  return (
    <div
      className={clsx([
        "flex items-center gap-2 px-3 pt-3",
        title ? "justify-between pb-2" : "justify-end pb-0",
      ])}
    >
      {title ? (
        <figcaption
          className="relative m-0 inline-block border-b-[1px] border-solid border-gray-400 px-2 pb-1 pt-0 text-xs font-bold text-gray-800 dark:text-white"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : null}

      <SnippetLanguageSelect title={title} />

      <div className="flex gap-1">
        {command ? (
          <SnippetActionButton
            action="webcli"
            command={command}
            snippetTitle={title}
          />
        ) : null}
        {code ? (
          <SnippetActionButton action="copy" code={code} snippetTitle={title} />
        ) : null}
      </div>
    </div>
  );
}

export default SnippetHeader;
