export interface DeviceConfig {
  deviceName: string;
  platformName: 'Android' | 'iOS';
  platformVersion: string;
  udid: string;
  app?: string;
  appPackage?: string;
  appActivity?: string;
}

export const devices: Record<string, DeviceConfig> = {
  realDevice: {
    deviceName: 'YOUR_DEVICE_NAME',
    platformName: 'Android',
    platformVersion: 'YOUR_ANDROID_VERSION',
    udid: 'YOUR_DEVICE_ID',
    app: './apps/demo-app.apk',
    appPackage: 'YOUR_APP_PACKAGE',
    appActivity: 'YOUR_APP_ACTIVITY',
  },

  emulator: {
    deviceName: 'Android Emulator',
    platformName: 'Android',
    platformVersion: '14',
    udid: 'emulator-5554',
    app: './apps/demo-app.apk',
    appPackage: 'YOUR_APP_PACKAGE',
    appActivity: 'YOUR_APP_ACTIVITY',
  },

  iosDevice: {
    deviceName: 'iPhone',
    platformName: 'iOS',
    platformVersion: '17.0',
    udid: 'YOUR_IOS_UDID',
    app: './apps/demo-app.ipa',
  },
};

export const DEFAULT_DEVICE = 'realDevice';
