import { Browser } from 'webdriverio';
import { BasePage } from '../base.page';
import { logger } from '../../utils/logger';

export class BottomNavigation extends BasePage {
  private selectors = {
    homeTab: '~homeTab',
    searchTab: '~searchTab',
    cartTab: '~cartTab',
    profileTab: '~profileTab',
    settingsTab: '~settingsTab',
    cartBadge: '~cartBadge',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async goToHome(): Promise<void> {
    logger.info('Navigating to Home tab');
    await this.click(this.selectors.homeTab);
  }

  async goToSearch(): Promise<void> {
    logger.info('Navigating to Search tab');
    await this.click(this.selectors.searchTab);
  }

  async goToCart(): Promise<void> {
    logger.info('Navigating to Cart tab');
    await this.click(this.selectors.cartTab);
  }

  async goToProfile(): Promise<void> {
    logger.info('Navigating to Profile tab');
    await this.click(this.selectors.profileTab);
  }

  async goToSettings(): Promise<void> {
    logger.info('Navigating to Settings tab');
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
