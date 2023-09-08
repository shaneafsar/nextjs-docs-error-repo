import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "../utils";
import browse from "./browse";

const synonyms: Command = {
  shortDesc: "Manage your Algolia synonyms",
  _: {
    browse,
    delete: {
      playDown: true,
      shortDesc: "Delete synonyms from an index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia synonyms delete"),
    },
    import: {
      playDown: true,
      shortDesc: "Import synonyms to the index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia synonyms import"),
    },
    save: {
      playDown: true,
      shortDesc: "Save a synonym to the given index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia synonyms save"),
    },
  },
};

export default synonyms;
