import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,

  expect: {
    timeout: 10000,
  },

  fullyParallel: false,
  workers: 1,
  retries: 1,

  reporter: [
    ['list'],
    ['html', { outputFolder: './reports/playwright-report' }],
    ['allure-playwright', { outputFolder: './reports/allure-results' }],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  outputDir: './reports/test-results',

  projects: [
    {
      name: 'android-real-device',
      use: {},
    },
  ],
});
