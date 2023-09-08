import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "../utils";
import browse from "./browse";

const rules: Command = {
  shortDesc: "Manage your Algolia rules",
  _: {
    browse,
    delete: {
      playDown: true,
      shortDesc: "Delete rules from an index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia rules delete"),
    },
    import: {
      playDown: true,
      shortDesc: "Import rules to the specified index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia rules import"),
    },
  },
};

export default rules;
