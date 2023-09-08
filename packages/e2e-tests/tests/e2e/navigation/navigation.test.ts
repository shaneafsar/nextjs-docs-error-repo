import { expect, test } from "@playwright/test";
import { CONTENT_TEST_URL } from "../config";

test("left sidebar renders", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("left-sidebar").isVisible();
});

test("opens category on click and back to home on 'home' click", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("Sending and managing data").click();
  await expect(page.getByText("Sending and managing data")).toBeVisible();
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page.getByTestId("home-page")).toBeVisible();
});

test("opens sub link", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL);
  await page.getByTestId("Components").click();
  await page.waitForURL(url => url.pathname.includes("components"))
  await expect(await page.url()).toContain("components");
});


test ("highlight opened link from url", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL);
  await expect(page.getByTestId("Content")).toHaveAttribute('aria-current', 'page')
})

test("has logo as return to home link", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL);
  await page.getByTestId("logo").click();
  await expect(page.getByTestId("home-page")).toBeVisible();
})

test("search bar opens docsearch", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL);
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByRole('button', { expanded: true })).toBeVisible()
})