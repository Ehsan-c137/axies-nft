import { test, expect } from "@playwright/test";

test.describe("explore page", async () => {
  test("should show filter & cards", async ({ page }) => {
    await page.goto("/explore");

    const filterContainer = page.locator('[data-testid="explore-filter"]');
    await expect(filterContainer).toBeVisible();

    const exploreCard = page.locator('[data-testid="explore-card"]').first();
    await expect(exploreCard).toBeVisible();
  });

  test("go to item deatils", async ({ page }) => {
    await page.goto("/explore");

    const exploreCard = page.locator('[data-testid="explore-card"]').first();
    await expect(exploreCard).toBeVisible();

    const viewHistoryLink = exploreCard.locator(
      '[data-testid="explore-card-view-history-link"]',
    );
    await viewHistoryLink.click();

    await page.waitForURL("item/**");
    expect(page.url()).not.toMatch(/\/explore\/\d+$/);

    const countdown = page.getByText("countdown");
    await expect(countdown).toBeVisible();
  });
});
