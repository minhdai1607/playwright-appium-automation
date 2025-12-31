import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Environment Configuration
 * Cấu hình môi trường test
 */
export const env = {
  // Môi trường hiện tại: 'local' | 'stg' | 'prod'
  current: process.env.ENV || 'local',

  // Appium server
  appiumHost: process.env.APPIUM_HOST || '127.0.0.1',
  appiumPort: parseInt(process.env.APPIUM_PORT || '4723'),

  // Test settings
  headless: process.env.HEADLESS === 'true',
  timeout: parseInt(process.env.TIMEOUT || '30000'),

  // API endpoints (nếu app có API)
  api: {
    local: 'http://localhost:3000/api',
    stg: 'https://stg-api.example.com',
    prod: 'https://api.example.com',
  },

  // Credentials (nếu cần)
  testUser: {
    username: process.env.TEST_USERNAME || 'testuser',
    password: process.env.TEST_PASSWORD || 'testpass123',
  },
};

// Helper để lấy API URL theo môi trường
export function getApiUrl(): string {
  return env.api[env.current as keyof typeof env.api] || env.api.local;
}

