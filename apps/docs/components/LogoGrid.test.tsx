import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import LogoGrid from "./LogoGrid";
import React from "react";

expect.extend(matchers);

describe("LogoGrid", () => {
  test("it renders a logo grid with different logos and links", () => {
    render(
      <LogoGrid
        spacing={3}
        cols={3}
        items={[
          { link: "#", src: "/logos/logos-php.svg", alt: "php", label: "PHP" },
          {
            link: "#",
            src: "/logos/logos-ruby.svg",
            alt: "ruby",
            label: "Ruby",
          },
        ]}
      ></LogoGrid>
    );

    expect(screen.getByAltText("php")).toBeDefined();
    expect(screen.getByAltText("ruby")).toBeDefined();
  });
});
