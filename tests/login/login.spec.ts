import { test, expect } from '../../fixtures/mobile.fixture';
import users from '../../test-data/users.json';
import { MESSAGES, TAGS } from '../../test-data/constants';
import { logger } from '../../utils/logger';

/**
 * Login Test Suite
 * Test cases cho chức năng đăng nhập
 */
test.describe('Login Tests', () => {
  
  test('TC001: Login thành công với credentials hợp lệ @smoke @login', async ({ 
    loginPage, 
    homePage 
  }) => {
    logger.testStart('TC001: Login thành công');

    // Step 1: Nhập username và password
    await loginPage.login(users.validUser.username, users.validUser.password);

    // Step 2: Verify chuyển đến Home page
    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    // Step 3: Verify welcome message
    const welcomeText = await homePage.getWelcomeText();
    expect(welcomeText).toContain(users.validUser.displayName);

    logger.testEnd('TC001', true);
  });

  test('TC002: Login thất bại với password sai @login', async ({ 
    loginPage 
  }) => {
    logger.testStart('TC002: Login thất bại với password sai');

    // Step 1: Nhập username đúng, password sai
    await loginPage.login(users.validUser.username, 'wrongpassword');

    // Step 2: Verify error message hiển thị
    const isError = await loginPage.isErrorDisplayed();
    expect(isError).toBe(true);

    // Step 3: Verify vẫn ở trang Login
    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('TC002', true);
  });

  test('TC003: Login thất bại với username không tồn tại @login', async ({ 
    loginPage 
  }) => {
    logger.testStart('TC003: Login với username không tồn tại');

    // Step 1: Nhập username không tồn tại
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    // Step 2: Verify error message
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();

    logger.testEnd('TC003', true);
  });

  test('TC004: Hiển thị trang Login @smoke @login', async ({ 
    loginPage 
  }) => {
    logger.testStart('TC004: Kiểm tra UI trang Login');

    // Verify các elements hiển thị
    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('TC004', true);
  });
});


