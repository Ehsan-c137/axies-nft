import { chromium, FullConfig, request } from "@playwright/test";
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from "../src/mocks/data";
import { REFRESH_TOKEN } from "../src/services/config";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;

  const reqContext = await request.newContext({ baseURL: baseURL! });

  const loginResponse = await reqContext.post("/api/auth/login", {
    data: {
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    },
  });

  if (!loginResponse.ok()) {
    throw new Error(
      `API login failed for user ${TEST_USER_EMAIL} with status ${loginResponse.status()}`,
    );
  }

  const cookies = loginResponse.headersArray();

  const refreshTokenCookie = cookies.find(
    (c) =>
      c.name.toLowerCase() === "set-cookie" &&
      c.value.trim().startsWith(`${REFRESH_TOKEN}=`),
  );

  if (!refreshTokenCookie) {
    throw new Error(
      `Could not find refresh token in 'set-cookie' headers. All headers: ${JSON.stringify(loginResponse.headers())}`,
    );
  }

  const match = refreshTokenCookie.value.match(
    new RegExp(`${REFRESH_TOKEN}=([^;]*)`),
  );
  const refreshTokenValue = match ? match[1].trim() : null;

  if (!refreshTokenValue) {
    throw new Error(
      `Could not parse refresh token from cookie: ${refreshTokenCookie.value}`,
    );
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: REFRESH_TOKEN,
      value: refreshTokenValue,
      domain: new URL(baseURL!).hostname,
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    },
  ]);

  await context.storageState({ path: storageState as string });
  await browser.close();
  await reqContext.dispose();
}

export default globalSetup;
