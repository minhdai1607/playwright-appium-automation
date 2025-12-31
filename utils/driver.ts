import { remote, Browser } from 'webdriverio';
import { appiumConfig } from '../config/appium.config';
import { devices, DEFAULT_DEVICE, DeviceConfig } from '../config/devices';
import { env } from '../config/env';
import { logger } from './logger';

export class AppiumDriver {
  private static instance: Browser | null = null;

  static async createDriver(deviceKey: string = DEFAULT_DEVICE): Promise<Browser> {
    const device = devices[deviceKey];
    
    if (!device) {
      throw new Error(`Device "${deviceKey}" not found in config`);
    }

    logger.info(`Connecting to device: ${device.deviceName}`);

    const capabilities = this.buildCapabilities(device);

    try {
      this.instance = await remote({
        hostname: env.appiumHost,
        port: env.appiumPort,
        path: appiumConfig.server.path,
        capabilities,
        logLevel: 'error',
      });

      await this.instance.setTimeout({ implicit: appiumConfig.timeouts.implicit });

      logger.info(`Connected to ${device.deviceName}`);
      return this.instance;
    } catch (error) {
      logger.error(`Failed to connect to device: ${error}`);
      throw error;
    }
  }

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

  static getDriver(): Browser {
    if (!this.instance) {
      throw new Error('Driver not initialized. Call createDriver() first.');
    }
    return this.instance;
  }

  static async quitDriver(): Promise<void> {
    if (this.instance) {
      logger.info('Closing driver...');
      await this.instance.deleteSession();
      this.instance = null;
      logger.info('Driver closed');
    }
  }

  static async restartApp(): Promise<void> {
    if (this.instance) {
      await this.instance.terminateApp(devices[DEFAULT_DEVICE].appPackage!);
      await this.instance.activateApp(devices[DEFAULT_DEVICE].appPackage!);
      logger.info('App restarted');
    }
  }
}

export const getDriver = () => AppiumDriver.getDriver();
