import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "./utils";

const apikeys: Command = {
  playDown: true,
  shortDesc: "Manage your Algolia API keys (only in desktop CLI)",
  _: {
    create: {
      playDown: true,
      shortDesc: "Create a new API key (only in desktop CLI)",
      run: notAvailableCommandRun("algolia apikeys create"),
    },
    delete: {
      playDown: true,
      shortDesc: "Delete API key (only in desktop CLI)",
      run: notAvailableCommandRun("algolia apikeys delete"),
    },
    list: {
      playDown: true,
      shortDesc: "List API keys (only in desktop CLI)",
      run: notAvailableCommandRun("algolia apikeys list"),
    },
  },
};

export default apikeys;
