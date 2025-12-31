import { Browser } from 'webdriverio';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  private selectors = {
    usernameInput: '~username',
    passwordInput: '~password',
    loginButton: '~loginButton',
    errorMessage: '~errorMessage',
    forgotPasswordLink: '~forgotPassword',
    registerLink: '~register',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async enterUsername(username: string): Promise<void> {
    logger.info(`Entering username: ${username}`);
    await this.type(this.selectors.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    logger.info('Entering password');
    await this.type(this.selectors.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    logger.info('Clicking login button');
    await this.hideKeyboard();
    await this.click(this.selectors.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    logger.step(1, 'Enter credentials');
    await this.enterUsername(username);
    await this.enterPassword(password);
    
    logger.step(2, 'Click login button');
    await this.clickLoginButton();
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.selectors.errorMessage);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.selectors.errorMessage);
  }

  async clickForgotPassword(): Promise<void> {
    await this.click(this.selectors.forgotPasswordLink);
  }

  async clickRegister(): Promise<void> {
    await this.click(this.selectors.registerLink);
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.isDisplayed(this.selectors.loginButton);
  }
}
