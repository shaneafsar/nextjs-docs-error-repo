import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import Grid from "./Grid";

expect.extend(matchers);

describe("Grid", () => {
  test("it renders a grid", () => {
    render(
      <Grid spacing={3} cols={3}>
        <p>Hello</p> <p>World</p> <p>!</p>
      </Grid>
    );
    const rendered = screen.getByText("World");
    expect(rendered).toBeVisible();
  });
});
