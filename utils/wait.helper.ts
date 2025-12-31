import { Browser, Element } from 'webdriverio';
import { appiumConfig } from '../config/appium.config';
import { logger } from './logger';

/**
 * Wait Helper
 * Các hàm chờ đợi element
 */
export class WaitHelper {
  private driver: Browser;
  private defaultTimeout: number;

  constructor(driver: Browser) {
    this.driver = driver;
    this.defaultTimeout = appiumConfig.timeouts.explicit;
  }

  /**
   * Chờ element xuất hiện và visible
   */
  async waitForVisible(selector: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  /**
   * Chờ element xuất hiện
   */
  async waitForExist(selector: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await element.waitForExist({ timeout });
    return element;
  }

  /**
   * Chờ element có thể click được
   */
  async waitForClickable(selector: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await element.waitForClickable({ timeout });
    return element;
  }

  /**
   * Chờ element biến mất
   */
  async waitForNotExist(selector: string, timeout: number = this.defaultTimeout): Promise<void> {
    const element = await this.driver.$(selector);
    await element.waitForExist({ timeout, reverse: true });
  }

  /**
   * Chờ element chứa text
   */
  async waitForText(selector: string, expectedText: string, timeout: number = this.defaultTimeout): Promise<Element> {
    const element = await this.driver.$(selector);
    await this.driver.waitUntil(
      async () => {
        const text = await element.getText();
        return text.includes(expectedText);
      },
      {
        timeout,
        timeoutMsg: `Element không chứa text "${expectedText}" sau ${timeout}ms`,
      }
    );
    return element;
  }

  /**
   * Chờ với điều kiện tùy chỉnh
   */
  async waitUntil(
    condition: () => Promise<boolean>,
    timeout: number = this.defaultTimeout,
    message: string = 'Điều kiện không thỏa mãn'
  ): Promise<void> {
    await this.driver.waitUntil(condition, {
      timeout,
      timeoutMsg: message,
    });
  }

  /**
   * Pause - dùng cho debug (không khuyến khích dùng trong test thực)
   */
  async pause(ms: number): Promise<void> {
    logger.warn(`⚠️ Đang pause ${ms}ms - chỉ dùng để debug`);
    await this.driver.pause(ms);
  }
}


