import { Browser } from 'webdriverio';
import { BasePage } from '../base.page';
import { logger } from '../../utils/logger';

export class BottomNavigation extends BasePage {

  private selectors = {
    homeTab: '~homeTab',           // Thay bằng ID thực tế
    searchTab: '~searchTab',       // Thay bằng ID thực tế
    cartTab: '~cartTab',           // Thay bằng ID thực tế
    profileTab: '~profileTab',     // Thay bằng ID thực tế
    settingsTab: '~settingsTab',   // Thay bằng ID thực tế
    cartBadge: '~cartBadge',       // Badge số lượng trên cart
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async goToHome(): Promise<void> {
    logger.info('Chuyển đến tab Home');
    await this.click(this.selectors.homeTab);
  }

  async goToSearch(): Promise<void> {
    logger.info('Chuyển đến tab Search');
    await this.click(this.selectors.searchTab);
  }

  async goToCart(): Promise<void> {
    logger.info('Chuyển đến tab Cart');
    await this.click(this.selectors.cartTab);
  }

  async goToProfile(): Promise<void> {
    logger.info('Chuyển đến tab Profile');
    await this.click(this.selectors.profileTab);
  }

  async goToSettings(): Promise<void> {
    logger.info('Chuyển đến tab Settings');
    await this.click(this.selectors.settingsTab);
  }

  async getCartBadgeCount(): Promise<number> {
    const isDisplayed = await this.isDisplayed(this.selectors.cartBadge);
    if (!isDisplayed) return 0;
    
    const text = await this.getText(this.selectors.cartBadge);
    return parseInt(text) || 0;
  }

  async isTabActive(tabName: 'home' | 'search' | 'cart' | 'profile' | 'settings'): Promise<boolean> {
    const selectorMap = {
      home: this.selectors.homeTab,
      search: this.selectors.searchTab,
      cart: this.selectors.cartTab,
      profile: this.selectors.profileTab,
      settings: this.selectors.settingsTab,
    };

    const element = await this.findElement(selectorMap[tabName]);
    const selected = await element.getAttribute('selected');
    return selected === 'true';
  }
}


