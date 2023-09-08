import { expect, test } from "@playwright/test";
import { COMPONENT_TEST_URL } from "../config";

test.beforeEach(async ({ page }, testInfo) => {
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
