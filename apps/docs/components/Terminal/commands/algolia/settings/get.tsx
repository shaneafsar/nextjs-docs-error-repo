import type { Command, RunCommand } from "@algolia/coquille";
import Json from "@components/Terminal/components/Json";
import algoliasearch from "algoliasearch";
import { formatError } from "../../utils";
import { getDefaultProfile } from "../profile/utils";

const run: RunCommand = async ({ args }) => {
  if (!args || !args[0]) {
    return formatError("command 'algolia settings get' needs an argument");
  }
  const defaultProfile = getDefaultProfile();
  const client = algoliasearch(
    defaultProfile.appId || "",
    defaultProfile.adminApiKey || ""
  );
  try {
    const index = client.initIndex(args[0]);
    const indexSettings = await index.getSettings();

    return <Json className="mt-5 block" object={indexSettings} />;
  } catch (error) {
    return formatError(
      "an error occurred while fetching settings. Please check the provided index name."
    );
  }
};

const get: Command = {
  shortDesc: "Get the settings of the specified index.",
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

export default get;
