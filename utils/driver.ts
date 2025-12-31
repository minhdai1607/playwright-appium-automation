import { remote, Browser } from 'webdriverio';
import { appiumConfig } from '../config/appium.config';
import { devices, DEFAULT_DEVICE, DeviceConfig } from '../config/devices';
import { env } from '../config/env';
import { logger } from './logger';

/**
 * Appium Driver Wrapper
 * Quản lý kết nối với Appium server
 */
export class AppiumDriver {
  private static instance: Browser | null = null;

  /**
   * Khởi tạo driver với device config
   */
  static async createDriver(deviceKey: string = DEFAULT_DEVICE): Promise<Browser> {
    const device = devices[deviceKey];
    
    if (!device) {
      throw new Error(`Device "${deviceKey}" không tìm thấy trong config`);
    }

    logger.info(`🚀 Đang kết nối với device: ${device.deviceName}`);

    const capabilities = this.buildCapabilities(device);

    try {
      this.instance = await remote({
        hostname: env.appiumHost,
        port: env.appiumPort,
        path: appiumConfig.server.path,
        capabilities,
        logLevel: 'error',
      });

      // Set implicit wait
      await this.instance.setTimeout({ implicit: appiumConfig.timeouts.implicit });

      logger.info(`✅ Kết nối thành công với ${device.deviceName}`);
      return this.instance;
    } catch (error) {
      logger.error(`❌ Không thể kết nối với device: ${error}`);
      throw error;
    }
  }

  /**
   * Build capabilities từ device config
   */
  private static buildCapabilities(device: DeviceConfig): Record<string, unknown> {
    const baseCapabilities = device.platformName === 'Android' 
      ? appiumConfig.androidCapabilities 
      : appiumConfig.iosCapabilities;

    return {
      ...baseCapabilities,
      'appium:deviceName': device.deviceName,
      'appium:platformVersion': device.platformVersion,
      'appium:udid': device.udid,
      ...(device.app && { 'appium:app': device.app }),
      ...(device.appPackage && { 'appium:appPackage': device.appPackage }),
      ...(device.appActivity && { 'appium:appActivity': device.appActivity }),
    };
  }

  /**
   * Lấy driver instance hiện tại
   */
  static getDriver(): Browser {
    if (!this.instance) {
      throw new Error('Driver chưa được khởi tạo. Gọi createDriver() trước.');
    }
    return this.instance;
  }

  /**
   * Đóng driver
   */
  static async quitDriver(): Promise<void> {
    if (this.instance) {
      logger.info('🛑 Đang đóng driver...');
      await this.instance.deleteSession();
      this.instance = null;
      logger.info('✅ Driver đã đóng');
    }
  }

  /**
   * Restart app
   */
  static async restartApp(): Promise<void> {
    if (this.instance) {
      await this.instance.terminateApp(devices[DEFAULT_DEVICE].appPackage!);
      await this.instance.activateApp(devices[DEFAULT_DEVICE].appPackage!);
      logger.info('🔄 App đã restart');
    }
  }
}

// Export singleton driver getter
export const getDriver = () => AppiumDriver.getDriver();


