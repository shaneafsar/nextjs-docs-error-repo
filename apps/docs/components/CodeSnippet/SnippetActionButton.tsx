"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { Clipboard, Terminal } from "react-feather";
import { commandToRun } from "@store/terminalStatus";
import { telemetry } from "@utils/telemetry";

type Props = (
  | {
      action: "copy";
      code: string;
      snippetTitle?: string;
    }
  | {
      action: "webcli";
      snippetTitle?: string;
      command: string;
    }
) &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function SnippetActionButton(props: Props) {
  if (props.action === "copy") {
    const { action, code, snippetTitle, ...buttonProps } = props;
    return (
      <CopyCodeButton
        code={props.code}
        snippetTitle={snippetTitle}
        {...buttonProps}
      />
    );
  }

  const { action, command, snippetTitle, ...buttonProps } = props;
  return (
    <RunInTerminalButton
      command={props.command}
      snippetTitle={snippetTitle}
      {...buttonProps}
    />
  );
}

interface RunInTerminalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  command: string;
  snippetTitle?: string;
}

export function RunInTerminalButton({
  command,
  snippetTitle,
  ...buttonsProps
}: RunInTerminalProps) {
  function runCommand() {
    commandToRun.set(command);
  }

  return (
    <button
      type="button"
      className={clsx(
        "group/button overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-100 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",
        "bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5"
      )}
      onClick={(e) => {
        runCommand();
        telemetry.track({
          name: "Component Interaction",
          properties: {
            componentId: snippetTitle
              ? `${e.view.document.URL}#${snippetTitle}`
              : `${e.view.document.URL}#${e.pageY}`,
            componentType: "code_snippet",
            interactionType: "run_in_terminal_clicked",
          },
        });
      }}
      {...buttonsProps}
    >
      <span className="pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300">
        <Terminal className="h-4 w-4 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
        Run
      </span>
    </button>
  );
}

interface CopyCodeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  code: string;
  snippetTitle?: string;
}

export function CopyCodeButton({
  code,
  snippetTitle,
  ...buttonProps
}: CopyCodeProps) {
  let [isCopied, setIsCopied] = useState(false);

  function copyCode(codeHtml: string) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = codeHtml;
    const codeElement = wrapper.querySelector("code");
    const codeText = codeElement?.innerText ?? "";
    window.navigator.clipboard.writeText(codeText).then(() => {
      setIsCopied(true);
    });
  }

  useEffect(() => {
    if (isCopied) {
      let timeout = setTimeout(() => setIsCopied(false), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  return (
    <button
      type="button"
      className={clsx(
        "group/button overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-100 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",
        isCopied
          ? "bg-xenon-400/10 ring-1 ring-inset ring-xenon-400/20"
          : "bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5"
      )}
      onClick={(e) => {
        copyCode(code);
        telemetry.track({
          name: "Component Interaction",
          properties: {
            componentId: snippetTitle
              ? `${e.view.document.URL}#${snippetTitle}`
              : `${e.view.document.URL}#${e.pageY}`,
            componentType: "code_snippet",
            interactionType: "copy_clicked",
          },
        });
      }}
      {...buttonProps}
    >
      <span
        aria-hidden={isCopied}
        className={clsx(
          "pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",
          isCopied && "-translate-y-1.5 opacity-0"
        )}
      >
        <Clipboard className="h-4 w-4 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
        Copy
      </span>
      <span
        aria-hidden={!isCopied}
        className={clsx(
          "pointer-events-none absolute inset-0 flex items-center justify-center text-xenon-400 transition duration-300",
          !isCopied && "translate-y-1.5 opacity-0"
        )}
      >
        Copied!
      </span>
    </button>
  );
}
