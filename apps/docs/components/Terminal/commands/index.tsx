import type { Commands, RunCommand } from "@algolia/coquille";
import {
  dispatchKeyboardEventInTerminal,
  runCommandInTerminal,
} from "@algolia/coquille";
import AlgoliaFullLogo from "../components/AlgoliaFullLogo";
import Link, { linkClassName } from "../components/Link";
import algolia from "./algolia";
import help from "./help";
import history from "./history";

const commands: Commands = {
  algolia,
  help,
  history,
};

export default commands;

export const runOnStart: RunCommand = (_, shell) => {
  const runHelp = () => runCommandInTerminal({ ...shell, command: "help" });
  const runHistory = () =>
    runCommandInTerminal({ ...shell, command: "history" });
  const pressTabKey = () =>
    dispatchKeyboardEventInTerminal({
      input: shell.input,
      event: {
        type: "keydown",
        eventInitDict: {
          bubbles: true,
          key: "Tab",
        },
      },
    });

  return (
    <p className="rounded-md border-[1px] border-white p-5">
      <Link href="https://algolia.com">
        <AlgoliaFullLogo width={120} className="mb-3" />
      </Link>
      Welcome to the web version of the Algolia CLI!
      <br />
      If you want to know more about it,{" "}
      <Link href="https://www.algolia.com/doc/tools/cli/get-started/overview/">
        get started here.
      </Link>
      <br />
      <br />- To list available commands, type{" "}
      <span className={linkClassName} onClick={runHelp}>
        help
      </span>
      .
      <br />- To discover commands,{" "}
      <span className={linkClassName} onClick={pressTabKey}>
        press tab key
      </span>
      .
      <br />- To navigate through your commands history, type{" "}
      <span className={linkClassName} onClick={runHistory}>
        history
      </span>{" "}
      or press key up/down.
    </p>
  );
};
