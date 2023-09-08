import { test, expect } from "@playwright/test";

test("homepage renders fine", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toContain("Algolia Docs");
});
