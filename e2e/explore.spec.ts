import { test, expect } from "@playwright/test";

test.describe("explore page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/explore");
    await page.waitForURL("/explore");
  });

  test("should show the filter controls", async ({ page }) => {
    const filterContainer = page.locator('[data-testid="explore-filter"]');
    await expect(filterContainer).toBeVisible();
  });

  test("should navigate to item details page on card click", async ({
    page,
  }) => {
    const exploreCard = page.locator('[data-testid="explore-card"]').first();

    const viewHistoryLink = exploreCard.locator(
      '[data-testid="explore-card-view-history-link"]',
    );
    const href = await viewHistoryLink.getAttribute("href");
    expect(href).toBeTruthy();

    await viewHistoryLink.click();
    await page.waitForURL(`${href}`);
    await expect(page).toHaveURL(`${href}`);

    await expect(page.locator('[data-testid="item-detail"]')).toBeVisible();

    const countdown = page.getByText("countdown");
    await expect(countdown).toBeVisible();
  });
});
