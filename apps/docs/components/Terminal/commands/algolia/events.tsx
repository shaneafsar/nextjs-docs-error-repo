import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "./utils";

const events: Command = {
  shortDesc: "Manage your Algolia events (only in desktop CLI)",
  playDown: true,
  _: {
    tail: {
      shortDesc: "Tail events",
      playDown: true,
      run: notAvailableCommandRun("algolia events tail"),
    },
  },
};

export default events;
