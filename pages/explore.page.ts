import { Browser } from 'webdriverio';
import { BasePage } from './base.page';

export class ExplorePage extends BasePage {
  private title = 'android=new UiSelector().descriptionContains("Hoàn thành ngay!")';

  constructor(driver: Browser) {
    super(driver);
  }
  async isTitleDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.title);
  }
}