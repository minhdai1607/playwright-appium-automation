import { test, expect } from '../../fixtures/mobile.fixture';
import users from '../../test-data/users.json';
import { logger } from '../../utils/logger';

/**
 * Home Page Test Suite
 * Test cases cho màn hình Home
 * 
 * Lưu ý: Các test này yêu cầu đã login trước
 */
test.describe('Home Page Tests', () => {

  // Login trước mỗi test
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('TC101: Hiển thị Home page sau khi login @home', async ({ 
    homePage 
  }) => {
    logger.testStart('TC101: Verify Home page hiển thị');

    // Wait for page to load
    await homePage.waitForPageLoad();

    // Verify on home page
    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    logger.testEnd('TC101', true);
  });

  test('TC102: Tìm kiếm trên Home page @home', async ({ 
    homePage 
  }) => {
    logger.testStart('TC102: Test chức năng tìm kiếm');

    // Wait for page to load
    await homePage.waitForPageLoad();

    // Thực hiện tìm kiếm
    await homePage.search('test keyword');

    // Verify kết quả tìm kiếm (tùy thuộc vào app)
    // Thêm assertions phù hợp với app của bạn

    logger.testEnd('TC102', true);
  });

  test('TC103: Navigate qua bottom tabs @home', async ({ 
    homePage,
    bottomNav 
  }) => {
    logger.testStart('TC103: Test bottom navigation');

    // Wait for page to load
    await homePage.waitForPageLoad();

    // Navigate qua các tabs
    await bottomNav.goToProfile();
    // Add assertion for profile page

    await bottomNav.goToCart();
    // Add assertion for cart page

    await bottomNav.goToHome();
    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    logger.testEnd('TC103', true);
  });

  test('TC104: Logout từ Home page @home', async ({ 
    homePage,
    loginPage 
  }) => {
    logger.testStart('TC104: Test logout');

    // Wait for page to load
    await homePage.waitForPageLoad();

    // Logout
    await homePage.logout();

    // Verify quay lại trang login
    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('TC104', true);
  });
});


