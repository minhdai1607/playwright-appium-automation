import { Browser } from "webdriverio";
import { BasePage } from "./base.page";

export class EventPage extends BasePage {
  private title = 'android=new UiSelector().descriptionContains("Sự kiện")';

  constructor(driver: Browser) {
    super(driver);
  }
  async isTitleDisplayed(): Promise<boolean> {
    return await this.isDisplayed(this.title);
  }
}