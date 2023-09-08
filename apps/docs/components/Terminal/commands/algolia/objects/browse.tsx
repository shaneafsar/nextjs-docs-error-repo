import type { Command, FlagValues, RunCommand } from "@algolia/coquille";
import Json from "@components/Terminal/components/Json";
import algoliasearch from "algoliasearch";
import { formatError } from "../../utils";
import searchParamsObjectFlags from "../gen/search-params-object-flags";
import { getDefaultProfile } from "../profile/utils";

interface Flags extends FlagValues {}

const run: RunCommand<Flags> = async ({ args, flags }) => {
  if (!args || !args[0]) {
    return formatError("command 'algolia browse' needs an argument");
  }

  const defaultProfile = getDefaultProfile();
  const [indexName] = args;
  const client = algoliasearch(
    defaultProfile.appId || "",
    defaultProfile.adminApiKey || ""
  );
  const index = client.initIndex(indexName);

  try {
    let hits: any[] = [];
    await index.browseObjects({
      batch: (hitsBatch) => {
        hits = hits.concat(hitsBatch);
      },
      ...flags,
      shouldStop: () => hits.length >= 6,
      hitsPerPage:
        flags && flags.hitsPerPage ? (flags.hitsPerPage as number) : 3,
    });
    return <Json object={hits} />;
  } catch {
    return formatError(`an error occured while browsing objects`);
  }
};

const browse: Command<Flags> = {
  shortDesc: "Browse the index objects",
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

export default browse as Command;
