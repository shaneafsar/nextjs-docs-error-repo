import type { Command, RunCommand } from "@algolia/coquille";
import { Fragment } from "react";

const run: RunCommand = (_, { history }) => {
  if (history.length === 0) {
    return "No history found. Start running commands to fill history!";
  }

  return (
    <dl className="-ml-1 mt-1 grid grid-cols-auto-full">
      {history.map((command, index) => (
        <Fragment key={`${command}-${index}`}>
          <dt className="pl-1 pr-6 font-bold">{index}</dt>
          <dd
            className="w-fit cursor-pointer hover:underline"
            onClick={() => navigator.clipboard.writeText(command)}
          >
            {command}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
};

const history: Command = {
  shortDesc: "Show commands history",
  args: { nbArgs: 0 },
  run,
};

export default history;
