import type { Command } from "@algolia/coquille";
import entries from "./entries";
import settings from "./settings";

const dictionary: Command = {
  shortDesc: "Manage your Algolia dictionaries",
  _: {
    entries,
    settings,
  },
};

export default dictionary;
