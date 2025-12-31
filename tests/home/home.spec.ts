import { test, expect } from '../../fixtures/mobile.fixture';
import users from '../../test-data/users.json';
import { logger } from '../../utils/logger';

test.describe('Home Page Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('TC101: Home page displays after login @home', async ({ 
    homePage 
  }) => {
    logger.testStart('TC101: Verify home page display');

    await homePage.waitForPageLoad();

    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    logger.testEnd('TC101', true);
  });

  test('TC102: Search on home page @home', async ({ 
    homePage 
  }) => {
    logger.testStart('TC102: Test search functionality');

    await homePage.waitForPageLoad();
    await homePage.search('test keyword');

    logger.testEnd('TC102', true);
  });

  test('TC103: Navigate through bottom tabs @home', async ({ 
    homePage,
    bottomNav 
  }) => {
    logger.testStart('TC103: Test bottom navigation');

    await homePage.waitForPageLoad();

    await bottomNav.goToProfile();
    await bottomNav.goToCart();
    await bottomNav.goToHome();
    
    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    logger.testEnd('TC103', true);
  });

  test('TC104: Logout from home page @home', async ({ 
    homePage,
    loginPage 
  }) => {
    logger.testStart('TC104: Test logout');

    await homePage.waitForPageLoad();
    await homePage.logout();

    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('TC104', true);
  });
});
