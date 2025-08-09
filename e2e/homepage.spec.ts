import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display all section headings as user scrolls", async ({
    page,
  }) => {
    await page.waitForURL("/");
    await expect(page.getByText("Discover and collect")).toBeVisible();

    const sectionLocators = [
      page.getByText("Set Up Your Wallet"),
      page.getByRole("heading", { name: "Live Auctions" }),
      page.getByRole("heading", { name: "Popular Collection" }),
      page.getByRole("heading", { name: "Top Seller" }),
      page.getByRole("heading", { name: "Today's Pick" }),
      page.getByText("Subscribe us"),
    ];

    for (const locator of sectionLocators) {
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible();
    }
  });

  test("should load more items when 'Load More' is clicked in Today's Pick", async ({
    page,
  }) => {
    await page.waitForURL("/");
    const todaysPickHeading = page.getByRole("heading", {
      name: "Today's Pick",
    });
    await todaysPickHeading.scrollIntoViewIfNeeded();
    await expect(todaysPickHeading).toBeVisible();

    const grid = page.locator('[data-testid="pagination-container"]');
    const pickItems = grid.locator("> *");

    const initialCount = await pickItems.count();
    const loadMoreButton = page.getByRole("button", { name: "Load More" });
    await loadMoreButton.click();

    await expect(async () => {
      expect(await pickItems.count()).toBeGreaterThan(initialCount);
    }).toPass({ timeout: 10000 });
  });
});
