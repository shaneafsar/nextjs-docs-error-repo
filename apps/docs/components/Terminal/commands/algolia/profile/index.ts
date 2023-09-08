import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "../utils";

const profile: Command = {
  playDown: true,
  shortDesc: "Manage your profiles (only in desktop CLI)",
  _: {
    add: {
      playDown: true,
      shortDesc:
        "Add a new profile configuration to the CLI. (only in desktop CLI)",
      run: notAvailableCommandRun("algolia profile add"),
    },
    list: {
      playDown: true,
      shortDesc: "List the configured profile(s). (only in desktop CLI)",
      run: notAvailableCommandRun("algolia profile list"),
    },
    remove: {
      playDown: true,
      shortDesc:
        "Remove the specified profile from the configuration. (only in desktop CLI)",
      run: notAvailableCommandRun("algolia profile remove"),
    },
    setdefault: {
      playDown: true,
      shortDesc: "Set the default profile. (only in desktop CLI)",
      run: notAvailableCommandRun("algolia profile setdefault"),
    },
  },
};

export default profile;
