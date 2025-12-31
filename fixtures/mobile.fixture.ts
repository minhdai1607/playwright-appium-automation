import { test as base } from '@playwright/test';
import { Browser } from 'webdriverio';
import { AppiumDriver } from '../utils/driver';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ExplorePage } from '../pages/explore.page';
import { EventPage } from '../pages/event.page';
import { logger } from '../utils/logger';

type MobileFixtures = {
  driver: Browser;
  loginPage: LoginPage;
  homePage: HomePage;
  explorePage: ExplorePage;
  eventPage: EventPage;
};

export const carv = base.extend<MobileFixtures>({
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

  explorePage: async ({ driver }, use) => {
    const explorePage = new ExplorePage(driver);
    await use(explorePage);
  },

});

export { expect } from '@playwright/test';
