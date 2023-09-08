import type { Command, RunCommand } from "@algolia/coquille";
import { formatError } from "@components/Terminal/commands/utils";
import algoliasearch from "algoliasearch";
import Json from "../../../components/Json";
import { getDefaultProfile } from "../profile/utils";

const run: RunCommand = async ({ args }) => {
  if (!args || args.length <= 0) {
    return formatError("Index name is required");
  }

  const defaultProfile = getDefaultProfile();
  const client = algoliasearch(
    defaultProfile.appId || "",
    defaultProfile.adminApiKey || ""
  );

  try {
    const index = client.initIndex(args[0]);

    let rules: any[] = [];
    await index.browseRules({
      batch: (rulesBatch) => (rules = rules.concat(rulesBatch)),
    });

    return <Json className="mt-5 block" object={rules} />;
  } catch (error) {
    return formatError("an error occurred while fetching rules");
  }
};

const browse: Command = {
  shortDesc: "List all the rules of an index",
  args: {
    nbArgs: 1,
    suggestions: [
      {
        name: process.env.NEXT_PUBLIC_CLI_INDEX_NAME!,
        description: "Movies & TV Series index",
      },
    ],
  },
  run,
};

export default browse;
