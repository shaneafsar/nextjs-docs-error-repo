import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "../utils";
import get from "./get";

const settings: Command = {
  shortDesc: "Manage your Algolia settings",
  _: {
    get,
    import: {
      playDown: true,
      shortDesc:
        "Import the index settings from the given file. (only in desktop CLI)",
      run: notAvailableCommandRun("algolia settings import"),
    },
    set: {
      playDown: true,
      shortDesc:
        "Set the settings of the specified index. (only in desktop CLI)",
      run: notAvailableCommandRun("algolia settings set"),
    },
  },
};

export default settings;
