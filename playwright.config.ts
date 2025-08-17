import path from "path";
import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 30 * 1000,
  testDir: path.join(__dirname, "e2e"),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  outputDir: "e2e-results/",
  webServer: {
    command: "npm run start",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "Mobile Chrome (Pixel 5)",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari (iPhone 12)",
      use: { ...devices["iPhone 12"] },
    },

    {
      name: "Desktop Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
