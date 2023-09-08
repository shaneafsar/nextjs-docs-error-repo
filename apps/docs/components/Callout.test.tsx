import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import Callout from "./Callout";

expect.extend(matchers);

describe("Callout", () => {
  test("it renders a default callout component", () => {
    render(<Callout> default </Callout>);
    const rendered = screen.getByText("default");
    expect(rendered).toBeVisible();
  });

  test("it renders a callout component with a title", () => {
    render(<Callout title="title"> default </Callout>);
    const rendered = screen.getByText("title");
    expect(rendered).toBeVisible();
  });

  // assuming that it works for warning, note, success and info
  test("it renders a warning callout component", () => {
    render(<Callout type="warning"> warning </Callout>);
    const rendered = screen.getByText("warning");
    expect(rendered).toBeVisible();
  });
});
