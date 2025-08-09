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

    const sections = [
      { name: "Set Up Your Wallet", role: "text" as const },
      { name: "Live Auctions", role: "heading" as const },
      { name: "Popular Collection", role: "heading" as const },
      { name: "Top Seller", role: "heading" as const },
      { name: "Today's Pick", role: "heading" as const },
      { name: "Subscribe us", role: "text" as const },
    ];

    for (const section of sections) {
      const locator =
        section.role === "heading"
          ? page.getByRole("heading", { name: section.name })
          : page.getByText(section.name);

      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible();
    }
  });

  test("should load more items when 'Load More' is clicked in Today's Pick", async ({
    page,
  }) => {
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
