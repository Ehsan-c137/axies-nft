import { test, expect } from "@playwright/test";

test.describe("explore page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/explore");
    await page.waitForURL("/explore");
  });

  test("should show the filter controls", async ({ page }) => {
    await expect(
      page.locator('[data-testid="explore-card"]').first(),
    ).toBeVisible();
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

  test("should update URL when a filter is applied", async ({ page }) => {
    const categoryFilterButton = page.locator(
      '[data-testid="filter-category"]',
    );
    await expect(categoryFilterButton).toBeVisible();

    await categoryFilterButton.click();

    const artFilter = page.locator('[data-testid="filter-option-art"]');

    await expect(artFilter).toBeVisible();

    await artFilter.click();

    await expect(page).toHaveURL(new RegExp(/.*[?&]category=art/));
  });
});
