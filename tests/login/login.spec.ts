import { test, expect } from '../../fixtures/mobile.fixture';
import users from '../../test-data/users.json';
import { logger } from '../../utils/logger';

test.describe('Login Tests', () => {
  
  test('TC001: Successful login with valid credentials @smoke @login', async ({ 
    loginPage, 
    homePage 
  }) => {
    logger.testStart('TC001: Successful login');

    await loginPage.login(users.validUser.username, users.validUser.password);

    const isOnHome = await homePage.isOnHomePage();
    expect(isOnHome).toBe(true);

    const welcomeText = await homePage.getWelcomeText();
    expect(welcomeText).toContain(users.validUser.displayName);

    logger.testEnd('TC001', true);
  });

  test('TC002: Failed login with wrong password @login', async ({ 
    loginPage 
  }) => {
    logger.testStart('TC002: Failed login with wrong password');

    await loginPage.login(users.validUser.username, 'wrongpassword');

    const isError = await loginPage.isErrorDisplayed();
    expect(isError).toBe(true);

    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('TC002', true);
  });

  test('TC003: Failed login with non-existent username @login', async ({ 
    loginPage 
  }) => {
    logger.testStart('TC003: Login with non-existent username');

    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();

    logger.testEnd('TC003', true);
  });

  test('TC004: Login page display @smoke @login', async ({ 
    loginPage 
  }) => {
    logger.testStart('TC004: Verify login page UI');

    const isOnLogin = await loginPage.isOnLoginPage();
    expect(isOnLogin).toBe(true);

    logger.testEnd('TC004', true);
  });
});
