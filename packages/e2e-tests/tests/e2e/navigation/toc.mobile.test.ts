import { test, expect } from "@playwright/test";
import { CONTENT_TEST_URL } from "../config";

test.use({
  viewport: { width: 390, height: 844 },
});

test("TOC [right sidebar] renders with all headings on page", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL)
  const tocElement = await page.getByTestId("toc-mobile")

  // check if TOC is visible
  expect(await tocElement.isVisible()).toBeTruthy();

  // get all h2 headings on the page - remove # suffix which was added from changing headings to links
  const headings = await page.$$eval('main h2', elements => elements.map(el => el.textContent!.trim().replace("#", "")));

  // get all toc items
  const tocItems = await page.$$eval('[data-testid="toc-mobile"] a', elements => elements.map(el => el.textContent!.trim()));

  // compare h2 headings and TOC items
  expect(headings).toEqual(tocItems);
});




test("Navigates to each heading on click", async ({ page }) => {
  await page.goto(CONTENT_TEST_URL)
  // open TOC
  await page.getByTestId('toc-mobile').click()

  // get the third TOC item
  const thirdTocItem = page.locator('[data-testid="toc-mobile"] a').nth(2);
  // get the third h2 heading on the page
  const thirdHeading = await ((await page.$$('main h2'))[2]).textContent() || "unfindable heading";

  // click on the third TOC item
  await thirdTocItem.click();

  // Wait for scroll to finish
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: thirdHeading.replace("#", "") })).toBeVisible();
})