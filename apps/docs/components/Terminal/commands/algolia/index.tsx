import type { Command } from "@algolia/coquille";
import { Help } from "@algolia/coquille";
import Link from "../../components/Link";
import apikeys from "./apikeys";
import dictionary from "./dictionary";
import events from "./events";
import indices from "./indices";
import objects from "./objects";
import open from "./open";
import profile from "./profile";
import rules from "./rules";
import search from "./search";
import settings from "./settings";
import synonyms from "./synonyms";

const algolia: Command = {
  shortDesc: "The official command-line tool to interact with Algolia",
  help: (args) => (
    <Help
      {...args}
      usage="algolia <command> <subcommand> [flags]"
      examples={[
        `$ algolia search MY_INDEX --query "foo"`,
        `$ algolia profile list`,
        `$ algolia indices list`,
      ]}
      learnMore={
        <>
          <p>
            {`Use 'algolia <command> <subcommand> --help' for more information about a command.`}
          </p>
          <p>
            Read the documentation at{" "}
            <Link href="https://algolia.com/doc/tools/cli">
              https://algolia.com/doc/tools/cli
            </Link>
          </p>
        </>
      }
    />
  ),
  _: {
    dictionary,
    indices,
    objects,
    open,
    rules,
    search,
    settings,
    synonyms,
    apikeys,
    events,
    profile,
  },
};

export default algolia;
