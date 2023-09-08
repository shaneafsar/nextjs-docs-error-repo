import type {
  Command,
  FlagValues,
  RunCommand,
  Suggestion,
} from "@algolia/coquille";
import Link from "../../components/Link";
import { formatError } from "../utils";

export const ALGOLIA_ROUTES = {
  algolia: "https://www.algolia.com",
  api: "https://www.algolia.com/doc/api-reference/rest-api/",
  "cli-docs": "https://algolia.com/doc/tools/cli/get-started/overview/",
  "cli-repo": "https://github.com/algolia/cli",
  codex: "https://www.algolia.com/developers/code-exchange/",
  dashboard: "https://www.algolia.com/dashboard",
  devhub: "https://www.algolia.com/developers/",
  docs: "https://algolia.com/doc/",
  ["easter-egg"]: "https://alg.li/new-docs-secret",
  languages: "https://alg.li/supported-languages",
  status: "https://status.algolia.com/",
};

export const ALGOLIA_ROUTES_SUGGESTIONS: Suggestion[] = Object.keys(
  ALGOLIA_ROUTES
).map((routeName) => ({
  name: routeName,
  description: ALGOLIA_ROUTES[routeName as keyof typeof ALGOLIA_ROUTES],
}));

interface Flags extends FlagValues {
  list: boolean;
}

const run: RunCommand<Flags> = async ({ args, flags }) => {
  if ((!args || args.length === 0) && (!flags || !flags.list)) {
    return formatError(
      "command 'algolia open' needs an argument or '--list' flag"
    );
  }

  if (args && args.length >= 1) {
    const [routeName] = args;
    const route = ALGOLIA_ROUTES[routeName as keyof typeof ALGOLIA_ROUTES];
    if (route) {
      window.open(route, "_blank");
      return `✅ ${routeName} (${route}) opened.`;
    }

    return `❌ Error: unsupported open command, given ${routeName}`;
  }

  if (flags && flags.list) {
    return (
      <>
        <p>
          {
            "open quickly opens Algolia pages. To use, run 'algolia open <shortcut>'."
          }
        </p>
        <p>open supports the following shortcuts:</p>
        <br />
        <p id="urls-descriptions" className="hidden">
          List of configured Algolia shortcuts for the URLs accessible with the
          Algolia CLI
        </p>
        <table aria-describedby="urls-descriptions">
          <thead>
            <tr className="text-left">
              <th scope="col" className="pr-6">
                SHORTCUT
              </th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(ALGOLIA_ROUTES).map((shortcut) => {
              const href =
                ALGOLIA_ROUTES[shortcut as keyof typeof ALGOLIA_ROUTES];

              return (
                <tr key={shortcut}>
                  <td className="pr-6">{shortcut}</td>
                  <td>
                    <Link href={href}>{href}</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
};

const open: Command<Flags> = {
  shortDesc: "Quickly open Algolia pages",
  args: { nbArgs: 1, suggestions: ALGOLIA_ROUTES_SUGGESTIONS },
  flags: {
    list: {
      type: "boolean",
      shorthand: "l",
      shortDesc: "List all supported shortcuts",
    },
  },
  run,
};

export default open as Command;
