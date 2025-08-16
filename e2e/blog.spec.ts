import { test, expect } from "@playwright/test";

test.describe("blog page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("should navigate to a blog detail page on item click", async ({
    page,
  }) => {
    await page.waitForURL("/blog");

    const firstBlogItem = page.locator('[data-testid="blog-card"]').first();
    await expect(firstBlogItem).toBeVisible();

    await firstBlogItem.getByRole("button").click();

    await page.waitForURL("**/blog/detail/**");
    expect(page.url()).not.toMatch(/\/blog\/\d+$/);
    await expect(page.getByText("not implemented yet")).toBeVisible();
  });
});
