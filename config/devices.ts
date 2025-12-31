/**
 * Device Configurations
 * ⚠️ THAY ĐỔI THÔNG TIN DEVICE CỦA BẠN TẠI ĐÂY
 * 
 * Cách lấy thông tin:
 * - Device ID: chạy `adb devices` trong terminal
 * - Platform Version: Settings > About Phone > Android Version
 * - Device Name: tên thiết bị của bạn
 */

export interface DeviceConfig {
  deviceName: string;
  platformName: 'Android' | 'iOS';
  platformVersion: string;
  udid: string; // Device ID
  app?: string; // Đường dẫn APK hoặc package name
  appPackage?: string;
  appActivity?: string;
}

// ⚠️ THAY ĐỔI THÔNG TIN DEVICE CỦA BẠN TẠI ĐÂY
export const devices: Record<string, DeviceConfig> = {
  // Real device Android - THAY ĐỔI THÔNG TIN NÀY
  realDevice: {
    deviceName: 'YOUR_DEVICE_NAME',        // VD: 'Samsung Galaxy S21'
    platformName: 'Android',
    platformVersion: 'YOUR_ANDROID_VERSION', // VD: '13'
    udid: 'YOUR_DEVICE_ID',                 // VD: 'RF8M33XXXXX' (từ adb devices)
    app: './apps/demo-app.apk',             // Đường dẫn APK
    appPackage: 'YOUR_APP_PACKAGE',         // VD: 'com.example.app'
    appActivity: 'YOUR_APP_ACTIVITY',       // VD: 'com.example.app.MainActivity'
  },

  // Emulator Android (nếu cần)
  emulator: {
    deviceName: 'Android Emulator',
    platformName: 'Android',
    platformVersion: '14',
    udid: 'emulator-5554',
    app: './apps/demo-app.apk',
    appPackage: 'YOUR_APP_PACKAGE',
    appActivity: 'YOUR_APP_ACTIVITY',
  },

  // Real device iOS (nếu cần)
  iosDevice: {
    deviceName: 'iPhone',
    platformName: 'iOS',
    platformVersion: '17.0',
    udid: 'YOUR_IOS_UDID',
    app: './apps/demo-app.ipa',
  },
};

// Device mặc định được sử dụng
export const DEFAULT_DEVICE = 'realDevice';

