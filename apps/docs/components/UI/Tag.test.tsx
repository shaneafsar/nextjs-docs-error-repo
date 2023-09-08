import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import Tag from "./Tag";
import React from "react";

expect.extend(matchers);

describe("Tag", () => {
  test("it renders a tag", () => {
    render(
      <Tag color="sky" variant="small">
        Test
      </Tag>
    );

    expect(screen.getByText("Test")).toBeVisible();
  });
});
