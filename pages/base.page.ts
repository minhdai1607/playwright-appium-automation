import { Browser, Element } from 'webdriverio';
import { WaitHelper } from '../utils/wait.helper';
import { GestureHelper } from '../utils/gesture.helper';
import { logger } from '../utils/logger';

export class BasePage {
  protected driver: Browser;
  protected wait: WaitHelper;
  protected gesture: GestureHelper;

  constructor(driver: Browser) {
    this.driver = driver;
    this.wait = new WaitHelper(driver);
    this.gesture = new GestureHelper(driver);
  }

  async findElement(selector: string): Promise<Element> {
    return await this.driver.$(selector);
  }

  async findElements(selector: string): Promise<Element[]> {
    return await this.driver.$$(selector);
  }

  async click(selector: string): Promise<void> {
    try {
      const element = await this.wait.waitForVisible(selector);
      await element.click();
      logger.debug(`Clicked: ${selector}`);
    } catch (error) {
      logger.error(`Search icon not found: ${error}`);
    }
  }

  async type(selector: string, text: string): Promise<void> {
    const element = await this.wait.waitForVisible(selector);
    await element.clearValue();
    await element.setValue(text);
    logger.debug(`Typed "${text}" into: ${selector}`);
  }

  async getText(selector: string): Promise<string> {
    const element = await this.wait.waitForVisible(selector);
    return element.getText();
  }

  async isDisplayed(selector: string): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return element.isDisplayed();
    } catch {
      return false;
    }
  }

  async isExisting(selector: string): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return element.isExisting();
    } catch {
      return false;
    }
  }

  async waitAndClick(selector: string, timeout?: number): Promise<void> {
    const element = await this.wait.waitForVisible(selector, timeout);
    await element.click();
  }

  async scrollToElement(selector: string, maxScrolls: number = 5): Promise<void> {
    await this.gesture.scrollToElement(selector, maxScrolls);
  }

  async getAttribute(selector: string, attributeName: string): Promise<string | null> {
    const element = await this.wait.waitForExist(selector);
    return element.getAttribute(attributeName);
  }

  async hideKeyboard(): Promise<void> {
    try {
      await this.driver.hideKeyboard();
    } catch {
    }
  }

  // async takeScreenshot(filename: string): Promise<string> {
  //   const screenshot = await this.driver.saveScreenshot(`./reports/screenshots/${filename}.png`);
  //   logger.info(`Screenshot saved: ${filename}.png`);
  //   return screenshot;
  // }

  async pressBack(): Promise<void> {
    await this.driver.back();
  }
}
