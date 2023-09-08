import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/doc-beta";
export const BASE_URL = process.env.E2E_BASE_URL || "http://localhost:3000/";


export default defineConfig({
  use: {
    baseURL: `${BASE_URL}/${basePath}`,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 20000,
  },
  timeout: 45000,
  expect: {
    timeout: 10000,
  },
  retries: 2,
  testDir: "./tests/",
  workers: process.env.CI ? 2 : undefined,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
