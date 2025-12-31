import { Browser } from 'webdriverio';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  private selectors = {
    emailInput: 'android=new UiSelector().text("Please enter your email address")',
    sendcodeButton: '~Send Code',
  };
  private errorMessage = {
    invalidEmail: 'android=new UiSelector().textContains("Invalid email address")',
  }
  
  constructor(driver: Browser) {
    super(driver);
  }

  async enterEmail(username: string): Promise<void> {
    logger.info(`Entering Email Account: ${username}`);
    await this.type(this.selectors.emailInput, username);
  }

  async clickSendcodeButton(): Promise<void> {
    logger.info('Clicking Send Code button');
    await this.hideKeyboard();
    await this.click(this.selectors.sendcodeButton);
  }

  async isInvalidEmailErrorDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.errorMessage.invalidEmail);
  }

}
