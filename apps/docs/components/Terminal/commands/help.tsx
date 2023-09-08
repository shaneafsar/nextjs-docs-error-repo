import type { Command, FlagValues, RunCommand } from "@algolia/coquille";
import { runCommandInTerminal } from "@algolia/coquille";
import clsx from "clsx";
import { Fragment } from "react";
import { runOnStart } from ".";
import { linkClassName } from "../components/Link";

const AVAILABLE_COMMANDS = [
  ["algolia", "The official command-line tool to interact with Algolia"],
  ["help", "Help about any available commands"],
  ["history", "Show commands history"],
];

interface Flags extends FlagValues {
  init: boolean;
}

const run: RunCommand<Flags> = async (command, shell) => {
  if (command.flags?.init) {
    return <div className="mt-5">{await runOnStart(command, shell)}</div>;
  }
  return (
    <>
      <p>List of available commands:</p>
      <dl className="-ml-1 mt-1 grid grid-cols-auto-full">
        {AVAILABLE_COMMANDS.map(([commandName, commandDescription]) => (
          <Fragment key={commandName}>
            <dd
              className={clsx(
                "w-full min-w-max rounded-l-sm pl-1 pr-6 font-bold",
                linkClassName
              )}
              onClick={() => {
                switch (commandName) {
                  case "algolia":
                    shell.setInputValue("algolia");
                    break;
                  case "help":
                    runCommandInTerminal({ ...shell, command: "help" });
                    break;
                  case "history":
                    runCommandInTerminal({ ...shell, command: "history" });
                    break;
                }
              }}
            >
              {commandName}
            </dd>
            <dt key={commandName} className="w-fit rounded-r-sm pr-1">
              {`-> ${commandDescription}`}
            </dt>
          </Fragment>
        ))}
      </dl>
    </>
  );
};

const help: Command<Flags> = {
  shortDesc: "Help about any available commands",
  flags: {
    init: {
      type: "boolean",
      shorthand: "i",
      shortDesc: "Display initial help message",
    },
  },
  args: { nbArgs: 0 },
  run,
};

export default help as Command;
