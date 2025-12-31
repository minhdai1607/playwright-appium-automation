import { defineConfig } from '@playwright/test';

/**
 * Playwright Configuration
 * Cấu hình cho Playwright Test Runner
 */
export default defineConfig({
  // Thư mục chứa test files
  testDir: './tests',

  // Timeout cho mỗi test (ms)
  timeout: 120000,

  // Timeout cho expect assertions
  expect: {
    timeout: 10000,
  },

  // Chạy test tuần tự (không parallel) vì sử dụng 1 device
  fullyParallel: false,
  workers: 1,

  // Retry khi fail
  retries: 1,

  // Reporter
  reporter: [
    ['list'],
    ['html', { outputFolder: './reports/playwright-report' }],
    ['allure-playwright', { outputFolder: './reports/allure-results' }],
  ],

  // Global setup/teardown
  use: {
    // Base settings
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  // Output folder for test artifacts
  outputDir: './reports/test-results',

  // Projects (có thể thêm nhiều device configs)
  projects: [
    {
      name: 'android-real-device',
      use: {
        // Có thể thêm device-specific settings ở đây
      },
    },
  ],
});


