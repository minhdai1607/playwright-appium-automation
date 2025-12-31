/**
 * Appium Server Configuration
 * Cấu hình server Appium
 */
export const appiumConfig = {
  // Appium server settings
  server: {
    host: '127.0.0.1',
    port: 4723,
    path: '/',
  },

  // Default timeouts (ms)
  timeouts: {
    implicit: 10000,
    explicit: 30000,
    pageLoad: 60000,
  },

  // Appium capabilities cho Android
  androidCapabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 300,
  },

  // Appium capabilities cho iOS (nếu cần)
  iosCapabilities: {
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoAcceptAlerts': true,
    'appium:newCommandTimeout': 300,
  },
};

