import { Browser } from 'webdriverio';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';
export class HomePage extends BasePage {
  private notificationIcon = '~Notification';
  private searchIcon = '//android.widget.ScrollView//android.view.ViewGroup[@clickable="true" and @focusable="true"][1]';
  private historyText = 'android=new UiSelector().text("History")';
  private eventCard = {
    blockLords: 'android=new UiSelector().descriptionContains("Block Lords")',
    seekersAlliance: 'android=new UiSelector().descriptionContains("Seekers Alliance")',
  };
  private selectors = {
    exploreTab: '~Khám phá',
    eventsTab: '~Sự kiện',
    earnTab: '~Earn',
    profileTab: '~Profile',
  };
  constructor(driver: Browser) {
    super(driver);
  }
  async goToExplore(): Promise<void> {
    logger.info('Navigating to Explore tab');
    await this.click(this.selectors.exploreTab);
  }

  async goToEvents(): Promise<void> {
    logger.info('Navigating to Events tab');
    await this.click(this.selectors.eventsTab);
  }

  async goToEarn(): Promise<void> {
    logger.info('Navigating to Earn tab');
    await this.click(this.selectors.earnTab);
  }

  async goToProfile(): Promise<void> {
    logger.info('Navigating to Profile tab');
    await this.click(this.selectors.profileTab);
  }

  async isTabDisplayed(tabName: 'explore' | 'events' | 'earn' | 'profile'): Promise<boolean> {
    const selectorMap = {
      explore: this.selectors.exploreTab,
      events: this.selectors.eventsTab,
      earn: this.selectors.earnTab,
      profile: this.selectors.profileTab,
    };
    return this.isDisplayed(selectorMap[tabName]);
  }
  async clickNotification(): Promise<void> {
    logger.info('Clicking notification');
    await this.click(this.notificationIcon);
  }

  async clickSearch(): Promise<void> {
    logger.info('Clicking search');
    await this.click(this.searchIcon);
  }

  async clickHistory(): Promise<void> {
    logger.info('Clicking history');
    await this.click(this.historyText);
  }
  
  async clickBlockLords(): Promise<void> {
    logger.info('Clicking Block Lords');
    await this.click(this.eventCard.blockLords);
  }
  
  async clickSeekersAlliance(): Promise<void> {
    logger.info('Clicking Seekers Alliance');
    await this.click(this.eventCard.seekersAlliance);
  }

}
