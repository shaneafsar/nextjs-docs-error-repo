import { describe, test, expect, afterEach } from "vitest";

import { getSelectedApplication } from "./application-utils";
import type { Application } from "@store/application";
import type { User } from "@store/auth";
import { authenticatedUserFixture } from "@mocks/fixtures/auth";

describe("application-utils", () => {
  describe("getSelectedApplication", () => {
    let applications: Application[] = [
      {
        application_id: "ABC123",
        search_api_key: "",
        name: "Old World Docs",
      },
      {
        application_id: "DEF456",
        search_api_key: "",
        name: "New World Docs",
      },
    ];

    let user: User = authenticatedUserFixture.user;

    afterEach(() => {
      user = authenticatedUserFixture.user;
    });

    test("returns undefined when there is no user", () => {
      expect(getSelectedApplication(applications, null)).toBeUndefined();
    });

    test("returns first application in list if no application is selected", () => {
      user.application_id = "";
      expect(getSelectedApplication(applications, user)).toEqual(
        applications[0]
      );
    });

    test("returns selected application for user", () => {
      user.application_id = "DEF456";
      expect(getSelectedApplication(applications, user)).toEqual(
        applications[1]
      );
    });
  });
});
