import { Browser, Element } from 'webdriverio';
import { appiumConfig } from '../config/appium.config';

export class WaitHelper {
  private driver: Browser;
  private defaultTimeout: number;

  constructor(driver: Browser) {
    this.driver = driver;
    this.defaultTimeout = appiumConfig.timeouts.explicit;
  }

  async waitForVisible(selector: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async waitForExist(selector: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await element.waitForExist({ timeout });
    return element;
  }

  async waitForClickable(selector: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await element.waitForClickable({ timeout });
    return element;
  }

  async waitForNotExist(selector: string, timeout: number = this.defaultTimeout): Promise<void> {
    const element = await this.driver.$(selector);
    await element.waitForExist({ timeout, reverse: true });
  }

  async waitForText(selector: string, expectedText: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await this.driver.waitUntil(
      async () => {
        const text = await element.getText();
        return text.includes(expectedText);
      },
      {
        timeout,
        timeoutMsg: `Element does not contain text "${expectedText}" after ${timeout}ms`,
      }
    );
    return element;
  }

  async waitUntil(
    condition: () => Promise<boolean>,
    timeout: number = this.defaultTimeout,
    message: string = 'Condition not satisfied'
  ): Promise<void> {
    await this.driver.waitUntil(condition, {
      timeout,
      timeoutMsg: message,
    });
  }

  async pause(ms: number): Promise<void> {
    await this.driver.pause(ms);
  }
}
