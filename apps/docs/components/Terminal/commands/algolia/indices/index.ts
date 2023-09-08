import { Command } from "@algolia/coquille";
import list from "./list";
import { notAvailableCommandRun } from "../utils";

const algolia: Command = {
  shortDesc: "Manage your Algolia indices",
  _: {
    list,
    clear: {
      playDown: true,
      shortDesc: "Clear the specified index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia indices clear"),
    },
    config: {
      playDown: true,
      shortDesc: "Manage your Algolia index config (only in desktop CLI)",
      run: notAvailableCommandRun("algolia indices config"),
    },
    copy: {
      playDown: true,
      shortDesc: "Make a copy of an index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia indices copy"),
    },
    delete: {
      playDown: true,
      shortDesc: "Delete one or multiple indices (only in desktop CLI)",
      run: notAvailableCommandRun("algolia indices delete"),
    },
    move: {
      playDown: true,
      shortDesc: "Move an index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia indices move"),
    },
  },
};

export default algolia;
