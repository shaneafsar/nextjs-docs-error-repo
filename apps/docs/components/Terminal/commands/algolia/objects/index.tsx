import type { Command } from "@algolia/coquille";
import { notAvailableCommandRun } from "../utils";
import browse from "./browse";

const objects: Command = {
  shortDesc: "Manage your indices’ objects",
  _: {
    browse,
    delete: {
      playDown: true,
      shortDesc: "Delete objects from an index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia objects delete"),
    },
    import: {
      playDown: true,
      shortDesc: "Import objects to the specified index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia objects import"),
    },
    operations: {
      playDown: true,
      shortDesc: "Perform several indexing operations (only in desktop CLI)",
      run: notAvailableCommandRun("algolia objects operations"),
    },
    update: {
      playDown: true,
      shortDesc:
        "Update objects from a file to the specified index (only in desktop CLI)",
      run: notAvailableCommandRun("algolia objects update"),
    },
  },
};

export default objects;
