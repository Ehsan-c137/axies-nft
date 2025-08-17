import { test, expect } from "@playwright/test";

test.describe("blog page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("should redirect from blog to blog/1", async ({ page }) => {
    await page.waitForURL("blog/1");

    expect(page.url()).toContain("/blog/1");

    const container = page.locator('[data-testid="pagination-container"]');

    const items = container.locator("> *");

    expect(await items.count()).toBeGreaterThan(0);
  });

  test("should loop through pagination links and verify page loads", async ({
    page,
  }) => {
    await page.goto("/blog/1");
    await page.waitForURL("/blog/1");
    const paginationLinks = page.locator('a[data-testid^="pagination-link-"]');
    const linkCount = await paginationLinks.count();
    const totalPages = linkCount + 1;
    let currentPage = 1;

    while (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const linkToClick = page.locator(
        `[data-testid="pagination-link-${nextPage}"]`,
      );
      await linkToClick.click();
      await page.waitForURL(`**/blog/${nextPage}`);
      expect(page.url()).toContain(`/blog/${nextPage}`);
      currentPage = nextPage;
    }
  });

  test("should navigate to a blog detail page on item click", async ({
    page,
  }) => {
    await page.goto("/blog/1");
    await page.waitForURL("/blog/1");

    const firstBlogItem = page.locator('[data-testid="blog-card"]').first();
    await expect(firstBlogItem).toBeVisible();

    await firstBlogItem.getByRole("button").click();

    await page.waitForURL("**/blog/detail/**");
    expect(page.url()).not.toMatch(/\/blog\/\d+$/);
    await expect(page.getByText("not implemented yet")).toBeVisible();
  });
});
