import { test, expect } from "@playwright/test";

test.describe("login page", () => {
  test("accessing a protected route shows the correct page", async ({
    page,
  }) => {
    // Intercept the refresh token request to simulate a secure environment.
    // The server sets a 'Secure' cookie, but the test runs on http://localhost.
    // By adding the 'X-Forwarded-Proto: https' header, we make the server
    // treat the request as if it came over HTTPS, allowing it to process the cookie.
    await page.route("**/api/auth/refresh", (route) => {
      const headers = {
        ...route.request().headers(),
        "x-forwarded-proto": "https",
      };
      route.continue({
        headers,
      });
    });

    await page.goto("/");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/auth/refresh") &&
        response.status() === 200,
    );

    await page.goto("/item-creation");

    await expect(page).toHaveURL(/.*item-creation/);
    const uploadHeading = page.getByRole("heading", { name: "Upload file" });
    await expect(uploadHeading).toBeVisible();
  });
});
