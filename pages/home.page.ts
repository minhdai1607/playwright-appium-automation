import { Browser } from 'webdriverio';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class HomePage extends BasePage {

  private selectors = {
    welcomeText: '~welcomeText',      // Thay bằng ID thực tế
    userAvatar: '~userAvatar',        // Thay bằng ID thực tế
    menuButton: '~menuButton',        // Thay bằng ID thực tế
    searchBar: '~searchBar',          // Thay bằng ID thực tế
    notificationIcon: '~notification', // Thay bằng ID thực tế
    logoutButton: '~logout',          // Thay bằng ID thực tế
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async getWelcomeText(): Promise<string> {
    logger.info('📖 Đọc welcome text');
    return this.getText(this.selectors.welcomeText);
  }

  async isOnHomePage(): Promise<boolean> {
    logger.info('🔍 Kiểm tra đang ở trang Home');
    return this.isDisplayed(this.selectors.welcomeText);
  }

  async clickUserAvatar(): Promise<void> {
    logger.info('🖱️ Click user avatar');
    await this.click(this.selectors.userAvatar);
  }

  async openMenu(): Promise<void> {
    logger.info('🖱️ Mở menu');
    await this.click(this.selectors.menuButton);
  }

  async search(keyword: string): Promise<void> {
    logger.info(`🔍 Tìm kiếm: ${keyword}`);
    await this.click(this.selectors.searchBar);
    await this.type(this.selectors.searchBar, keyword);
    await this.hideKeyboard();
  }

  async clickNotification(): Promise<void> {
    logger.info('🖱️ Click notification');
    await this.click(this.selectors.notificationIcon);
  }

  async logout(): Promise<void> {
    logger.info('🚪 Đăng xuất');
    await this.openMenu();
    await this.click(this.selectors.logoutButton);
  }

  async waitForPageLoad(timeout: number = 10000): Promise<void> {
    logger.info('⏳ Chờ trang Home load');
    await this.wait.waitForVisible(this.selectors.welcomeText, timeout);
  }
}
