import { expect, test } from "@playwright/test";
import { COMPONENT_TEST_URL } from "../config";

test.use({
  viewport: { width: 390, height: 844 },
});

test.beforeEach(async ({ page }) => {
  await page.goto(COMPONENT_TEST_URL);
  await page.waitForURL((url) => url.pathname.includes("components"));
});

// Callout
test("Callout component", async ({ page }) => {
  await expect(page.getByTestId("callout")).toBeVisible();
});

// Media
test("Media component", async ({ page }) => {
  await expect(page.getByTestId("media-video")).toBeVisible();
  await expect(page.getByTestId("media-image")).toBeVisible();
});

// Feedback
test("Feedback component", async ({ page }) => {
  await expect(page.getByTestId("thumbs-up")).toBeVisible();
});
