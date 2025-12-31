import { Browser, Element } from 'webdriverio';
import { WaitHelper } from '../utils/wait.helper';
import { GestureHelper } from '../utils/gesture.helper';
import { logger } from '../utils/logger';

/**
 * Base Page
 * Class cơ sở cho tất cả các page object
 */
export class BasePage {
  protected driver: Browser;
  protected wait: WaitHelper;
  protected gesture: GestureHelper;

  constructor(driver: Browser) {
    this.driver = driver;
    this.wait = new WaitHelper(driver);
    this.gesture = new GestureHelper(driver);
  }

  /**
   * Tìm element bằng selector
   * Hỗ trợ: id, xpath, accessibility id, class name
   * 
   * Ví dụ selectors:
   * - ID: '~loginButton' hoặc 'id=loginButton'
   * - XPath: '//android.widget.Button[@text="Login"]'
   * - Accessibility ID: '~accessibilityId'
   * - Class: 'android.widget.EditText'
   */
  async findElement(selector: string): Promise<Element> {
    return this.driver.$(selector);
  }

  /**
   * Tìm nhiều elements
   */
  async findElements(selector: string): Promise<Element[]> {
    return this.driver.$$(selector);
  }

  /**
   * Click vào element
   */
  async click(selector: string): Promise<void> {
    const element = await this.wait.waitForClickable(selector);
    await element.click();
    logger.debug(`Clicked: ${selector}`);
  }

  /**
   * Nhập text vào input
   */
  async type(selector: string, text: string): Promise<void> {
    const element = await this.wait.waitForVisible(selector);
    await element.clearValue();
    await element.setValue(text);
    logger.debug(`Typed "${text}" into: ${selector}`);
  }

  /**
   * Lấy text từ element
   */
  async getText(selector: string): Promise<string> {
    const element = await this.wait.waitForVisible(selector);
    return element.getText();
  }

  /**
   * Kiểm tra element có hiển thị không
   */
  async isDisplayed(selector: string): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return element.isDisplayed();
    } catch {
      return false;
    }
  }

  /**
   * Kiểm tra element có tồn tại không
   */
  async isExisting(selector: string): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return element.isExisting();
    } catch {
      return false;
    }
  }

  /**
   * Chờ và click
   */
  async waitAndClick(selector: string, timeout?: number): Promise<void> {
    const element = await this.wait.waitForClickable(selector, timeout);
    await element.click();
  }

  /**
   * Scroll đến element
   */
  async scrollToElement(selector: string, maxScrolls: number = 5): Promise<void> {
    await this.gesture.scrollToElement(selector, maxScrolls);
  }

  /**
   * Lấy attribute của element
   */
  async getAttribute(selector: string, attributeName: string): Promise<string | null> {
    const element = await this.wait.waitForExist(selector);
    return element.getAttribute(attributeName);
  }

  /**
   * Ẩn keyboard
   */
  async hideKeyboard(): Promise<void> {
    try {
      await this.driver.hideKeyboard();
    } catch {
      // Keyboard không hiển thị - bỏ qua
    }
  }

  /**
   * Chụp screenshot
   */
  async takeScreenshot(filename: string): Promise<string> {
    const screenshot = await this.driver.saveScreenshot(`./reports/screenshots/${filename}.png`);
    logger.info(`📸 Screenshot saved: ${filename}.png`);
    return screenshot;
  }

  /**
   * Quay lại (back button)
   */
  async pressBack(): Promise<void> {
    await this.driver.back();
  }
}


