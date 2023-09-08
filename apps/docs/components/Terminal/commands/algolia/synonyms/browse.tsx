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

    let synonyms: any[] = [];
    await index.browseSynonyms({
      batch: (synonymsBatch) => (synonyms = synonyms.concat(synonymsBatch)),
    });

    return <Json className="mt-5 block" object={synonyms} />;
  } catch (error) {
    return formatError("an error occurred while fetching synonyms.");
  }
};

const browse: Command = {
  shortDesc: "List all the the synonyms of the given index.",
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
