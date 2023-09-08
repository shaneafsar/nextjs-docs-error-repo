import type { Command, FlagValues, RunCommand } from "@algolia/coquille";
import { formatError } from "@components/Terminal/commands/utils";
import algoliasearch from "algoliasearch";
import Json from "../../../../components/Json";
import { getDefaultProfile } from "../../profile/utils";

interface Flags extends FlagValues {
  all: boolean;
  "include-defaults": boolean;
}

enum Scope {
  Stopwords = "stopwords",
  Plurals = "plurals",
  Compounds = "compounds",
}

const run: RunCommand = async ({ args, flags }) => {
  const hasArgs = args && args.length > 0;
  const hasAllFlag = flags && flags.all;

  if (!hasArgs && !hasAllFlag) {
    return formatError(
      "dictionary names are required when --all is set to false"
    );
  }
  if (hasAllFlag && hasArgs) {
    return formatError(
      "no dictionary name is required when --all is set to true"
    );
  }

  if (
    hasArgs &&
    !args.every((arg) => Object.values(Scope).includes(arg as Scope))
  ) {
    return formatError(
      "only 'stopwords', 'plurals' and 'compounds' are supported dictionary names"
    );
  }

  let scope: Scope[] = [];
  if (hasAllFlag) {
    scope = [Scope.Stopwords, Scope.Plurals, Scope.Compounds];
  }
  if (
    hasArgs &&
    args.every((arg) => Object.values(Scope).includes(arg as Scope))
  ) {
    scope = args as Scope[];
  }

  const defaultProfile = getDefaultProfile();
  const client = algoliasearch(
    defaultProfile.appId || "",
    defaultProfile.adminApiKey || ""
  );

  let dictionaryEntries: any = [];
  for (const dictionary of scope) {
    try {
      const entries = await client.searchDictionaryEntries(dictionary, "", {
        hitsPerPage: 10,
      });
      dictionaryEntries = [...dictionaryEntries, ...entries.hits];
    } catch (error) {
      return formatError(
        "an error occurred while fetching dictionary entries."
      );
    }
  }

  if (!flags || !flags["include-defaults"]) {
    dictionaryEntries = dictionaryEntries.filter(
      (entry) => entry.type === "custom"
    );
  }

  if (dictionaryEntries.length === 0) {
    return "No entries found";
  }

  try {
    return <Json className="mt-5 block" object={dictionaryEntries} />;
  } catch (error) {
    return formatError("an error occurred while fetching dictionary entries.");
  }
};

const browse: Command<Flags> = {
  shortDesc: "Browse dictionary entries",
  args: {
    nbArgs: 3,
    suggestions: [
      {
        name: Scope.Stopwords,
      },
      {
        name: Scope.Plurals,
      },
      {
        name: Scope.Compounds,
      },
    ],
  },
  flags: {
    all: {
      multiple: false,
      shortDesc: "browse all dictionnaries",
      shorthand: "a",
      type: "boolean",
    },
    ["include-defaults"]: {
      multiple: false,
      shortDesc: "include default stopwords",
      shorthand: "d",
      type: "boolean",
    },
  },
  run,
};

export default browse as Command;
