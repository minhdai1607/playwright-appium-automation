import { Browser } from 'webdriverio';
import { logger } from './logger';

export class GestureHelper {
  private driver: Browser;

  constructor(driver: Browser) {
    this.driver = driver;
  }

  async swipe(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    duration: number = 800
  ): Promise<void> {
    await this.driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerMove', duration, x: endX, y: endY },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await this.driver.releaseActions();
  }

  async swipeUp(): Promise<void> {
    const { width, height } = await this.driver.getWindowSize();
    const startX = width / 2;
    const startY = height * 0.7;
    const endY = height * 0.3;
    
    await this.swipe(startX, startY, startX, endY);
  }

  async swipeDown(): Promise<void> {
    const { width, height } = await this.driver.getWindowSize();
    const startX = width / 2;
    const startY = height * 0.3;
    const endY = height * 0.7;
    
    await this.swipe(startX, startY, startX, endY);
  }

  async swipeLeft(): Promise<void> {
    const { width, height } = await this.driver.getWindowSize();
    const startX = width * 0.8;
    const endX = width * 0.2;
    const y = height / 2;
    
    await this.swipe(startX, y, endX, y);
  }

  async swipeRight(): Promise<void> {
    const { width, height } = await this.driver.getWindowSize();
    const startX = width * 0.2;
    const endX = width * 0.8;
    const y = height / 2;
    
    await this.swipe(startX, y, endX, y);
  }

  async scrollToElement(
    selector: string,
    maxScrolls: number = 5,
    direction: 'up' | 'down' = 'up'
  ): Promise<void> {
    let scrollCount = 0;
    
    while (scrollCount < maxScrolls) {
      const element = await this.driver.$(selector);
      if (await element.isDisplayed()) {
        logger.info(`Element found after ${scrollCount} scrolls`);
        return;
      }
      
      if (direction === 'up') {
        await this.swipeUp();
      } else {
        await this.swipeDown();
      }
      
      scrollCount++;
      await this.driver.pause(500);
    }
    
    throw new Error(`Element "${selector}" not found after ${maxScrolls} scrolls`);
  }

  async tapByCoordinates(x: number, y: number): Promise<void> {
    await this.driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x, y },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await this.driver.releaseActions();
  }

  async longPress(selector: string, duration: number = 2000): Promise<void> {
    const element = await this.driver.$(selector);
    const location = await element.getLocation();
    const size = await element.getSize();
    
    const centerX = location.x + size.width / 2;
    const centerY = location.y + size.height / 2;

    await this.driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await this.driver.releaseActions();
  }

  async doubleTap(selector: string): Promise<void> {
    const element = await this.driver.$(selector);
    await element.doubleClick();
  }
}
