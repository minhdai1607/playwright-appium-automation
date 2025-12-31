import { test, expect } from '../../fixtures/mobile.fixture';
import users from '../../test-data/users.json';
import { logger } from '../../utils/logger';

/**
 * Smoke Test Suite
 * Các test cơ bản để verify app hoạt động
 * 
 * Chạy: npm run test:smoke
 */
test.describe('Smoke Tests @smoke', () => {

  test('SMOKE-001: App khởi động thành công', async ({ 
    driver 
  }) => {
    logger.testStart('SMOKE-001: Verify app khởi động');

    // Verify driver connected
    expect(driver).toBeTruthy();

    // Verify app đang chạy
    const status = await driver.status();
    expect(status).toBeTruthy();

    logger.info('✅ App khởi động thành công');
    logger.testEnd('SMOKE-001', true);
  });

  test('SMOKE-002: Login page hiển thị @smoke', async ({ 
    loginPage 
  }) => {
    logger.testStart('SMOKE-002: Verify Login page');

    // Verify login page hiển thị
    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('SMOKE-002', true);
  });

  test('SMOKE-003: Login flow hoạt động @smoke', async ({ 
    loginPage,
    homePage 
  }) => {
    logger.testStart('SMOKE-003: Verify Login flow');

    // Login
    await loginPage.login(users.validUser.username, users.validUser.password);

    // Verify home page
    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    logger.testEnd('SMOKE-003', true);
  });

  test('SMOKE-004: Gesture cơ bản hoạt động @smoke', async ({ 
    loginPage,
    homePage,
    gesture 
  }) => {
    logger.testStart('SMOKE-004: Verify gestures');

    // Login first
    await loginPage.login(users.validUser.username, users.validUser.password);
    await homePage.waitForPageLoad();

    // Test swipe
    await gesture.swipeUp();
    await gesture.swipeDown();

    logger.info('✅ Gestures hoạt động bình thường');
    logger.testEnd('SMOKE-004', true);
  });

  test('SMOKE-005: Screenshot capture hoạt động @smoke', async ({ 
    loginPage 
  }) => {
    logger.testStart('SMOKE-005: Verify screenshot');

    // Capture screenshot
    await loginPage.takeScreenshot('smoke-test-screenshot');

    logger.testEnd('SMOKE-005', true);
  });
});


