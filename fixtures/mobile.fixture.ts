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

export const test = base.extend<MobileFixtures>({
  driver: async ({}, use) => {
    logger.testStart('Initializing Appium Driver');
    const driver = await AppiumDriver.createDriver();
    await use(driver);
    await AppiumDriver.quitDriver();
  },

  loginPage: async ({ driver }, use) => {
    const loginPage = new LoginPage(driver);
    await use(loginPage);
  },

  homePage: async ({ driver }, use) => {
    const homePage = new HomePage(driver);
    await use(homePage);
  },

  bottomNav: async ({ driver }, use) => {
    const bottomNav = new BottomNavigation(driver);
    await use(bottomNav);
  },

  wait: async ({ driver }, use) => {
    const wait = new WaitHelper(driver);
    await use(wait);
  },

  gesture: async ({ driver }, use) => {
    const gesture = new GestureHelper(driver);
    await use(gesture);
  },
});

export { expect } from '@playwright/test';
