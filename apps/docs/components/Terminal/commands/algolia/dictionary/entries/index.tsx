import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "../../utils";
import browse from "./browse";

const entries: Command = {
  shortDesc: "Manage your Algolia dictionaries entries",
  _: {
    browse,
    clear: {
      playDown: true,
      shortDesc: "Clear dictionary entries (only in desktop CLI)",
      run: notAvailableCommandRun("algolia dictionary entries clear"),
    },
    delete: {
      playDown: true,
      shortDesc:
        "Delete dictionary entries from an index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia dictionary entries delete"),
    },
    import: {
      playDown: true,
      shortDesc:
        "Import dictionary entries from a file to the specified index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia dictionary entries import"),
    },
  },
};

export default entries;
