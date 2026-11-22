import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
// Optional: use an installed browser instead of Playwright's download,
// e.g. PowerShell `$env:PW_CHANNEL = "msedge"` (Edge ships with Windows).
const channel = process.env.PW_CHANNEL || undefined;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel } },
  ],
  webServer: {
    command: "npm run dev",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
