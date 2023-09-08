import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import Icon from "./Icon";

expect.extend(matchers);

describe("Logo", () => {
  test("it renders", () => {
    render(<Icon name="predict" />);
    const rendered = screen.getByTestId("algolia-predict-icon");
    expect(rendered).toBeVisible();
  });
});
