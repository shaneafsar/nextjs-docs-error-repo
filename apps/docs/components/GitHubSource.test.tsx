import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import GitHubSource from "./GitHubSource";
import { useAuth } from "@hooks/useAuth";
import {
  authenticatedUserFixture,
  authenticatedAlgoliaEmployeeFixture,
} from "@mocks/fixtures/auth";

expect.extend(matchers);

describe("GitHubSourceLink", () => {
  vi.mock("@hooks/useAuth", () => {
    const useAuth = vi.fn();
    return { useAuth };
  });

  test("it renders when the user is logged in and is an Algolia employee", () => {
    vi.mocked(useAuth).mockReturnValue({
      isLoggedIn: true,
      isLoading: false,
      authState: "fetched",
      ...authenticatedAlgoliaEmployeeFixture,
    });
    render(<GitHubSource source={"test"} />);
    const rendered = screen.getByTestId("github-source-link");
    expect(rendered).toBeVisible();
  });

  test("it does not render when the user is not an Algolia employee", () => {
    vi.mocked(useAuth).mockReturnValue({
      isLoggedIn: true,
      isLoading: false,
      authState: "fetched",
      ...authenticatedUserFixture,
    });
    render(<GitHubSource source={"test"} />);
    const rendered = screen.queryByTestId("github-source-link");
    expect(rendered).toBeNull();
  });

  test("it does not render when the user is not logged in", () => {
    vi.mocked(useAuth).mockReturnValue({
      isLoggedIn: false,
      isLoading: false,
      authState: "fetched",
      user: null,
    });
    render(<GitHubSource source={"test"} />);
    const rendered = screen.queryByTestId("github-source-link");
    expect(rendered).toBeNull();
  });
});
