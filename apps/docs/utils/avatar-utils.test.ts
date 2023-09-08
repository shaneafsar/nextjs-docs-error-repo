import { describe, test, expect } from "vitest";

import {
  getApplicationColors,
  getApplicationInitials,
  getUserBackgroundClassName,
} from "./avatar-utils";

describe("avatar-utils", () => {
  describe("getApplicationColors", () => {
    test("returns default colors for no application", () => {
      expect(getApplicationColors()).toEqual("bg-gray-200 text-grey-800");
    });

    test("returns appropriate colors for application_id", () => {
      expect(
        getApplicationColors({
          application_id: "UQUXLST6A6",
          search_api_key: "",
        })
      ).toEqual("bg-nebula-200 text-nebula-800");
      expect(
        getApplicationColors({
          application_id: "TMDOKHI53A",
          search_api_key: "",
        })
      ).toEqual("bg-blue-300 text-blue-900");
    });
  });

  describe("getApplicationInitials", () => {
    test("returns empty string if no application is provided", () => {
      expect(getApplicationInitials()).toBe("");
    });

    test("returns initials based on application_id if no name", () => {
      expect(
        getApplicationInitials({ application_id: "ABC123", search_api_key: "" })
      ).toBe("AB");
      expect(
        getApplicationInitials({
          application_id: "7FJR36O",
          search_api_key: "",
        })
      ).toBe("7F");
    });

    test("returns initials based on application_id if name is too short", () => {
      expect(
        getApplicationInitials({
          name: "B",
          application_id: "ABC123",
          search_api_key: "",
        })
      ).toBe("AB");
    });

    test("returns initials based on name", () => {
      expect(
        getApplicationInitials({
          name: "Test",
          application_id: "ABC123",
          search_api_key: "",
        })
      ).toBe("TE");
      expect(
        getApplicationInitials({
          name: "New World Docs",
          application_id: "ABC123",
          search_api_key: "",
        })
      ).toBe("NW");
      expect(
        getApplicationInitials({
          name: "staging-example",
          application_id: "ABC123",
          search_api_key: "",
        })
      ).toBe("SE");
    });
  });

  describe("getUserBackgroundClassName", () => {
    test("returns default background classes for no email", () => {
      expect(getUserBackgroundClassName("no-email")).toBe(
        "bg-pink-400 text-grey-900"
      );
    });

    test("returns correct background classes for email", () => {
      expect(getUserBackgroundClassName("john.doe@email.com")).toBe(
        "bg-orange-400 text-gray-900"
      );
      expect(getUserBackgroundClassName("janedoe@test.com")).toBe(
        "bg-gray-700 text-white"
      );
    });
  });
});
