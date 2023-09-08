import type { Command, FlagValues, RunCommand } from "@algolia/coquille";
import algoliasearch, { SearchIndex } from "algoliasearch";
import Json from "../../../components/Json";
import { formatError } from "../../utils";
import searchParamsObjectFlags from "../gen/search-params-object-flags";
import { getDefaultProfile } from "../profile/utils";

const run: RunCommand = async ({ args, flags }) => {
  if (!args || !args[0]) {
    return formatError("command 'algolia search' needs an argument");
  }
  const defaultProfile = getDefaultProfile();

  const sanitizedFlags: FlagValues = flags || {};

  if (!sanitizedFlags.hitsPerPage) {
    sanitizedFlags.hitsPerPage = 3;
  }

  const [indexName] = args;
  const client = algoliasearch(
    defaultProfile.appId || "",
    defaultProfile.adminApiKey || ""
  );
  let index: SearchIndex;
  try {
    index = client.initIndex(indexName);
  } catch {
    return formatError(`wrong index name '${indexName}'`);
  }
  try {
    const hits = await index.search(
      sanitizedFlags.query ? String(sanitizedFlags.query) : "",
      flags
    );
    if (hits.length === 0) {
      return "No results found";
    }
    return <Json object={hits} />;
  } catch {
    return formatError(`wrong query ${sanitizedFlags.query}`);
  }
};

const search: Command = {
  shortDesc: "Search for objects in your index",
  args: {
    nbArgs: 1,
    suggestions: [
      {
        name: process.env.NEXT_PUBLIC_CLI_INDEX_NAME!,
        description: "Movies & TV Series index",
      },
    ],
  },
  flags: searchParamsObjectFlags,
  run,
};

export default search;
