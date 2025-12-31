import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  current: process.env.ENV || 'local',
  appiumHost: process.env.APPIUM_HOST || '127.0.0.1',
  appiumPort: parseInt(process.env.APPIUM_PORT || '4723'),
  headless: process.env.HEADLESS === 'false',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  path: process.env.PATH || '/wd/hub',
  appGoogleKey: process.env.APP_GOOGLE_KEY || '',

  api: {
    local: 'http://localhost:3000/api',
    stg: 'https://stg-api.example.com',
    prod: 'https://api.example.com',
  },

  testUser: {
    username: process.env.TEST_USERNAME || 'craftingshard+675@gmail.com',
  },

  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID || '',
    clientSecret: process.env.GMAIL_CLIENT_SECRET || '',
    refreshToken: process.env.GMAIL_REFRESH_TOKEN || '',
  },
};

export function getApiUrl(): string {
  return env.api[env.current as keyof typeof env.api] || env.api.local;
}
