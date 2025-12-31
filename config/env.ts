import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  current: process.env.ENV || 'local',
  appiumHost: process.env.APPIUM_HOST || '127.0.0.1',
  appiumPort: parseInt(process.env.APPIUM_PORT || '4723'),
  headless: process.env.HEADLESS === 'true',
  timeout: parseInt(process.env.TIMEOUT || '30000'),

  api: {
    local: 'http://localhost:3000/api',
    stg: 'https://stg-api.example.com',
    prod: 'https://api.example.com',
  },

  testUser: {
    username: process.env.TEST_USERNAME || 'testuser',
    password: process.env.TEST_PASSWORD || 'testpass123',
  },
};

export function getApiUrl(): string {
  return env.api[env.current as keyof typeof env.api] || env.api.local;
}
