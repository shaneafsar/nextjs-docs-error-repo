import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import Logo from "./Logo";

expect.extend(matchers);

describe("Logo", () => {
  test("it renders", () => {
    render(<Logo />);
    const rendered = screen.getByTestId("logo");
    expect(rendered).toBeVisible();
  });
});
