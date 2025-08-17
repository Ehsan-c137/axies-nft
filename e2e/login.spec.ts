import { test, expect, type Page } from "@playwright/test";
import { ACCESS_TOKEN } from "@/services/config";

async function performLogin(page: Page) {
  const emailInput = page.locator('[data-testid="email-input"]');
  const passwordInput = page.locator('[data-testid="password-input"]');

  await emailInput.click();
  await emailInput.fill("test@example.com");

  await passwordInput.click();
  await passwordInput.fill("p@ssword123");

  await expect(emailInput).toHaveValue("test@example.com");
  await expect(passwordInput).toHaveValue("p@ssword123");

  await page.getByRole("button", { name: "Login" }).click();
}

test.describe("login page", () => {
  test("login into app and sets session cookie", async ({ page }) => {
    await page.goto("/login");

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes("/api/auth/login") && resp.status() === 200,
    );
    const navigationPromise = page.waitForURL("/");

    await performLogin(page);

    await Promise.all([navigationPromise, responsePromise]);
    await expect(page).toHaveURL("/");

    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => c.name === ACCESS_TOKEN);
    expect(
      sessionCookie,
      "Session cookie should be set after login",
    ).toBeDefined();
    expect(sessionCookie?.httpOnly).toBe(true);
  });

  test("login with callbackUrl redirects to the correct page", async ({
    page,
  }) => {
    const callbackUrl = "/explore";
    const url = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    await page.goto(url);
    await page.waitForURL(url);

    const navigationPromise = page.waitForURL(callbackUrl);
    await performLogin(page);
    await navigationPromise;
    await expect(page).toHaveURL(callbackUrl);
    await expect(
      page.locator('[data-testid="pagination-container"]'),
    ).toBeVisible();
  });
});
