import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.BASE_URL;
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    timeout: 30 * 1000,
  },

  use: {
    baseURL,
    actionTimeout: 20 * 1000,
    navigationTimeout: 20 * 1000,
    trace: 'on'
  },

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      retries: 1,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { 
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'dist/reports/e2e' }],
    ['allure-playwright'],
  ],
});
