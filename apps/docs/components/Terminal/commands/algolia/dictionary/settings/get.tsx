import type { Command, RunCommand } from "@algolia/coquille";
import { formatError } from "@components/Terminal/commands/utils";
import Json from "@components/Terminal/components/Json";
import algoliasearch from "algoliasearch";
import { getDefaultProfile } from "../../profile/utils";

const run: RunCommand = async () => {
  const defaultProfile = getDefaultProfile();
  const client = algoliasearch(
    defaultProfile.appId || "",
    defaultProfile.adminApiKey || ""
  );

  try {
    const settings = await client.getDictionarySettings();
    return <Json className="mt-5 block" object={settings} />;
  } catch (error) {
    return formatError(
      `an error occurred while fetching dictionary entries (${error})`
    );
  }
};

const get: Command = {
  shortDesc: "Get the dictionary settings",
  run,
};

export default get;
