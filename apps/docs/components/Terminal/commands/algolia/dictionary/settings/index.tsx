import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "../../utils";
import get from "./get";

const settings: Command = {
  shortDesc: "Manage your Algolia dictionaries settings",
  _: {
    get,
    set: {
      playDown: true,
      shortDesc: "Set the dictionary settings (only in desktop CLI)",
      run: notAvailableCommandRun("algolia dictionary entries import"),
    },
  },
};

export default settings;
