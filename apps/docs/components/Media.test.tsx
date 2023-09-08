import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import Media from "./Media";

expect.extend(matchers);

describe("Logo", () => {
  test("it renders a loop", () => {
    render(
      <Media
        id="color-refinement-list-3642daf7_fspvbn"
        type="video-loop"
        alt="test"
      />
    );
    const rendered = screen.getByTestId("video-loop");
    expect(rendered).toBeVisible();
  });

  test("it renders a placeholder image", () => {
    render(<Media id="placeholder" type="image" alt="test" />);
    const rendered = screen.getByTestId("placeholder-image");
    expect(rendered).toBeVisible();
  });

  test("it renders a video from youtube", () => {
    render(<Media id="hvjf3QRAA8c" type="video-youtube" alt="test" />);
    const rendered = screen.getByTestId("video-youtube");
    expect(rendered).toBeVisible();
  });
  test("it renders a video from youtube", () => {
    render(
      <Media id="tVADrUcQjnxngGPDQCacxq" type="video-vidyard" alt="test" />
    );
    const rendered = screen.getByTestId("video-vidyard");
    expect(rendered).toBeVisible();
  });
});
