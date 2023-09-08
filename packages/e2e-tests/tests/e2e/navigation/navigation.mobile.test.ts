import { expect, test } from "@playwright/test";
import { CONTENT_TEST_URL } from "../config";

test.use({
  viewport: { width: 390, height: 844 },
});

test("left sidebar renders", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page.getByTestId("left-navigation-mobile").isVisible();
});

test("opens category on click and back to home on 'home' click", async ({
  page,
}) => {
  /* fix: FLAKY
  await page.goto("/");
  await page.getByRole('button', { name: 'Toggle navigation' }).click()

  // get the first link inside the element with left navigation sidebar (index 2) since the first two are links from the banner.
  const firstLink = await page.locator('[data-testid="left-mobile-nav"] a').nth(3);
  console.log(await firstLink.textContent())
  const firstLinkText = await firstLink.textContent();
  await firstLink.click();
  await expect(firstLinkText).toBeTruthy();

  await page.waitForTimeout(1000)

  // go back home
  await page.getByRole('button', { name: 'Toggle navigation' }).click()
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page.getByTestId("home-page")).toBeVisible(); */
});

test("opens sub link", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL);
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page.getByTestId("left-mobile-nav").getByTestId("Components").click();
  await page.waitForURL((url) => url.pathname.includes("components"));
  await expect(await page.url()).toContain("components");
});

test("highlight opened link from url", async ({ page }) => {
  /* fix: FLAKY
  await page.goto(CONTENT_TEST_URL);
  await page.getByRole('button', { name: 'Toggle navigation' }).click()
  await expect(page.getByTestId("left-mobile-nav").getByTestId("Content")).toHaveAttribute('aria-current', 'page') */
});

test("has logo as return to home link", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL);
  await page.getByTestId("logo-monogram").click();
  await expect(page.getByTestId("home-page")).toBeVisible();
});

test("search bar opens docsearch", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL);
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("button", { expanded: true })).toBeVisible();
});
