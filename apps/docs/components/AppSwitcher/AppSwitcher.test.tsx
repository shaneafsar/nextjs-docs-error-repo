import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import AppSwitcher from "./AppSwitcher";

expect.extend(matchers);

describe("AppSwitcher", () => {
  test("renders the App Switcher", () => {
    render(
      <AppSwitcher
        selectedApplication={{
          application_id: "ABC123",
          name: "Old World Docs",
          search_api_key: "1234567890",
        }}
      />
    );
    const rendered = screen.getByTestId("app-switcher");
    const appInitials = screen.getByRole("img");
    const appName = screen.getByText(/Old World Docs/);

    expect(rendered).toBeVisible();
    expect(appInitials).toHaveTextContent("OW");
    expect(appName).toBeVisible();
  });
});
