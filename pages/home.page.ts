import { Browser } from 'webdriverio';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class HomePage extends BasePage {
  private selectors = {
    welcomeText: '~welcomeText',
    userAvatar: '~userAvatar',
    menuButton: '~menuButton',
    searchBar: '~searchBar',
    notificationIcon: '~notification',
    logoutButton: '~logout',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async getWelcomeText(): Promise<string> {
    logger.info('Getting welcome text');
    return this.getText(this.selectors.welcomeText);
  }

  async isOnHomePage(): Promise<boolean> {
    logger.info('Checking if on home page');
    return this.isDisplayed(this.selectors.welcomeText);
  }

  async clickUserAvatar(): Promise<void> {
    logger.info('Clicking user avatar');
    await this.click(this.selectors.userAvatar);
  }

  async openMenu(): Promise<void> {
    logger.info('Opening menu');
    await this.click(this.selectors.menuButton);
  }

  async search(keyword: string): Promise<void> {
    logger.info(`Searching for: ${keyword}`);
    await this.click(this.selectors.searchBar);
    await this.type(this.selectors.searchBar, keyword);
    await this.hideKeyboard();
  }

  async clickNotification(): Promise<void> {
    logger.info('Clicking notification');
    await this.click(this.selectors.notificationIcon);
  }

  async logout(): Promise<void> {
    logger.info('Logging out');
    await this.openMenu();
    await this.click(this.selectors.logoutButton);
  }

  async waitForPageLoad(timeout: number = 10000): Promise<void> {
    logger.info('Waiting for home page to load');
    await this.wait.waitForVisible(this.selectors.welcomeText, timeout);
  }
}
