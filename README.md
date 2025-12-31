# Playwright Appium Automation

Mobile automation testing framework với Playwright Test Runner và Appium.

## 📁 Cấu trúc Project

```
playwright-appium-automation/
│
├── apps/                       # App under test
│   └── demo-app.apk            # APK file của bạn
│
├── config/
│   ├── appium.config.ts        # Appium server & capability config
│   ├── devices.ts              # Device/emulator definitions ⚠️ CẦN SỬA
│   └── env.ts                  # Environment config (stg / prod / local)
│
├── tests/
│   ├── login/
│   │   └── login.spec.ts
│   ├── home/
│   │   └── home.spec.ts
│   └── smoke/
│       └── smoke.spec.ts
│
├── pages/                      # Page Object Model
│   ├── base.page.ts
│   ├── login.page.ts           # ⚠️ CẦN SỬA SELECTORS
│   ├── home.page.ts            # ⚠️ CẦN SỬA SELECTORS
│   └── common/
│       └── bottom-nav.page.ts
│
├── utils/
│   ├── driver.ts               # Appium driver wrapper
│   ├── wait.helper.ts
│   ├── gesture.helper.ts       # swipe, scroll, tap
│   └── logger.ts
│
├── test-data/
│   ├── users.json
│   └── constants.ts
│
├── fixtures/
│   └── mobile.fixture.ts       # Playwright custom fixture
│
├── reports/
│   ├── allure-results/
│   └── playwright-report/
│
├── scripts/
│   ├── start-appium.ps1        # Windows
│   └── start-appium.sh         # Mac/Linux
│
├── env.example
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

## 🚀 Cài đặt

### 1. Yêu cầu

- Node.js >= 18
- Java JDK 11+
- Android SDK (đã cài `adb`)
- Appium 2.x

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cài đặt Appium globally

```bash
npm install -g appium
appium driver install uiautomator2
```

### 4. Verify cài đặt

```bash
# Kiểm tra adb
adb devices

# Kiểm tra appium
appium --version
```

## ⚙️ Cấu hình Device

### Bước 1: Lấy thông tin device

```bash
# Lấy Device ID
adb devices

# Lấy Android version
adb shell getprop ro.build.version.release

# Lấy package và activity của app
adb shell dumpsys window | findstr mCurrentFocus
```

### Bước 2: Cập nhật `config/devices.ts`

```typescript
export const devices = {
  realDevice: {
    deviceName: 'Samsung Galaxy S21',      // Tên device
    platformName: 'Android',
    platformVersion: '13',                  // Android version
    udid: 'RF8M33XXXXX',                   // Device ID từ adb devices
    app: './apps/demo-app.apk',            // Đường dẫn APK
    appPackage: 'com.example.app',         // Package name
    appActivity: 'com.example.MainActivity', // Main activity
  },
};
```

### Bước 3: Cập nhật Selectors trong Pages

Mở các file trong `pages/` và cập nhật selectors theo app của bạn:

```typescript
// pages/login.page.ts
private selectors = {
  usernameInput: '~username',        // Accessibility ID
  // hoặc
  usernameInput: 'id=com.example:id/username',  // Resource ID
  // hoặc
  usernameInput: '//android.widget.EditText[@text="Username"]', // XPath
};
```

## 🏃 Chạy Test

### 1. Khởi động Appium Server

```bash
# Windows PowerShell
.\scripts\start-appium.ps1

# Hoặc chạy trực tiếp
npm run appium:start
```

### 2. Kết nối device

- Bật USB Debugging trên điện thoại
- Kết nối USB với máy tính
- Chạy `adb devices` để verify

### 3. Chạy test

```bash
# Chạy tất cả test
npm test

# Chạy smoke test
npm run test:smoke

# Chạy login test
npm run test:login

# Chạy test cụ thể
npx playwright test tests/login/login.spec.ts
```

## 📊 Xem Report

```bash
# Playwright HTML Report
npm run report

# Allure Report
npm run allure:generate
npm run allure:open
```

## 📝 Viết Test Case Mới

### 1. Tạo Page Object (nếu cần)

```typescript
// pages/product.page.ts
import { Browser } from 'webdriverio';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  private selectors = {
    productTitle: '~productTitle',
    addToCartBtn: '~addToCart',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async addToCart(): Promise<void> {
    await this.click(this.selectors.addToCartBtn);
  }
}
```

### 2. Tạo Test File

```typescript
// tests/product/product.spec.ts
import { test, expect } from '../../fixtures/mobile.fixture';

test.describe('Product Tests', () => {
  test('Add product to cart', async ({ driver }) => {
    // Test code here
  });
});
```

## 🔍 Cách tìm Selectors

### Dùng Appium Inspector

1. Tải Appium Inspector: https://github.com/appium/appium-inspector/releases
2. Kết nối với Appium server
3. Inspect elements trên app

### Các loại Selector phổ biến

```typescript
// Accessibility ID (khuyên dùng)
'~elementId'

// Resource ID
'id=com.example:id/element_id'

// XPath
'//android.widget.Button[@text="Login"]'

// Class name
'android.widget.EditText'

// Android UIAutomator
'android=new UiSelector().text("Login")'
```

## 🐛 Troubleshooting

### Lỗi: "Could not start a new session"
- Kiểm tra Appium server đang chạy
- Kiểm tra device đã kết nối (`adb devices`)
- Kiểm tra thông tin device trong `config/devices.ts`

### Lỗi: "Element not found"
- Kiểm tra selector đúng chưa
- Thêm wait trước khi tìm element
- Dùng Appium Inspector để verify selector

### Lỗi: "App not installed"
- Kiểm tra đường dẫn APK đúng chưa
- Kiểm tra APK có tồn tại trong `apps/` folder

## 📚 Tài liệu tham khảo

- [Appium Documentation](https://appium.io/docs/en/2.1/)
- [WebdriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [Playwright Test Documentation](https://playwright.dev/docs/test-intro)
