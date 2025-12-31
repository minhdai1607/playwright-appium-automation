import { test as base } from '@playwright/test';
import { Browser } from 'webdriverio';
import { AppiumDriver } from '../utils/driver';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { BottomNavigation } from '../pages/common/bottom-nav.page';
import { WaitHelper } from '../utils/wait.helper';
import { GestureHelper } from '../utils/gesture.helper';
import { logger } from '../utils/logger';

type MobileFixtures = {
  driver: Browser;
  loginPage: LoginPage;
  homePage: HomePage;
  bottomNav: BottomNavigation;
  wait: WaitHelper;
  gesture: GestureHelper;
};

// Extend Playwright test với custom fixtures
export const test = base.extend<MobileFixtures>({
  // Driver fixture - tạo và đóng Appium session
  driver: async ({}, use) => {
    logger.testStart('Initializing Appium Driver');
    
    // Tạo driver
    const driver = await AppiumDriver.createDriver();
    
    // Sử dụng driver trong test
    await use(driver);
    
    // Cleanup sau khi test hoàn thành
    await AppiumDriver.quitDriver();
  },

  // Login Page fixture
  loginPage: async ({ driver }, use) => {
    const loginPage = new LoginPage(driver);
    await use(loginPage);
  },

  // Home Page fixture
  homePage: async ({ driver }, use) => {
    const homePage = new HomePage(driver);
    await use(homePage);
  },

  // Bottom Navigation fixture
  bottomNav: async ({ driver }, use) => {
    const bottomNav = new BottomNavigation(driver);
    await use(bottomNav);
  },

  // Wait Helper fixture
  wait: async ({ driver }, use) => {
    const wait = new WaitHelper(driver);
    await use(wait);
  },

  // Gesture Helper fixture
  gesture: async ({ driver }, use) => {
    const gesture = new GestureHelper(driver);
    await use(gesture);
  },
});

// Re-export expect từ Playwright
export { expect } from '@playwright/test';


