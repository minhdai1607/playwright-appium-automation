import { test, expect } from '../../fixtures/mobile.fixture';
import users from '../../test-data/users.json';
import { logger } from '../../utils/logger';

test.describe('Smoke Tests @smoke', () => {

  test('SMOKE-001: App launches successfully', async ({ 
    driver 
  }) => {
    logger.testStart('SMOKE-001: Verify app launch');

    expect(driver).toBeTruthy();

    const status = await driver.status();
    expect(status).toBeTruthy();

    logger.info('App launched successfully');
    logger.testEnd('SMOKE-001', true);
  });

  test('SMOKE-002: Login page displays @smoke', async ({ 
    loginPage 
  }) => {
    logger.testStart('SMOKE-002: Verify login page');

    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('SMOKE-002', true);
  });

  test('SMOKE-003: Login flow works @smoke', async ({ 
    loginPage,
    homePage 
  }) => {
    logger.testStart('SMOKE-003: Verify login flow');

    await loginPage.login(users.validUser.username, users.validUser.password);

    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    logger.testEnd('SMOKE-003', true);
  });

  test('SMOKE-004: Basic gestures work @smoke', async ({ 
    loginPage,
    homePage,
    gesture 
  }) => {
    logger.testStart('SMOKE-004: Verify gestures');

    await loginPage.login(users.validUser.username, users.validUser.password);
    await homePage.waitForPageLoad();

    await gesture.swipeUp();
    await gesture.swipeDown();

    logger.info('Gestures work correctly');
    logger.testEnd('SMOKE-004', true);
  });

  test('SMOKE-005: Screenshot capture works @smoke', async ({ 
    loginPage 
  }) => {
    logger.testStart('SMOKE-005: Verify screenshot');

    await loginPage.takeScreenshot('smoke-test-screenshot');

    logger.testEnd('SMOKE-005', true);
  });
});
