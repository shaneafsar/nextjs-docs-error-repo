import { expect, test } from "@playwright/test";
import { CONTENT_TEST_URL, GATE_TEST_URL } from "../config";

// Gating tests are flaky on CI, so we're skipping them for now
// Not sure if preview links are logged in or not.
/* test("Gate component with redirectTo effectively redirects", async ({ page }) => {
  await page.goto(GATE_TEST_URL);
  await page.waitForURL((url) => url.pathname.includes("gated"));
  // timeout 2 seconds for the page to load so we can check for the gate
  await page.waitForTimeout(2000);
  // expect the page to be redirected to the content url
  await expect(page.url()).(CONTENT_TEST_URL);
}); */