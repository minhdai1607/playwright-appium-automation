import { env } from "./env";

export const appiumConfig = {
  server: {
    host: env.appiumHost,
    port: env.appiumPort,
    path: env.path,
  },

  timeouts: {
    implicit: 10000,
    explicit: 30000,
    pageLoad: 60000,
  },

  androidCapabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 300,
  },

  iosCapabilities: {
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoAcceptAlerts': true,
    'appium:newCommandTimeout': 300,
  },
};
