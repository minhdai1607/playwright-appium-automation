# Playwright Appium Automation

Mobile automation testing framework with Playwright Test Runner and Appium.

## Project Structure

```
playwright-appium-automation/
├── apps/                       # App under test
│   └── demo-app.apk
├── config/
│   ├── appium.config.ts        # Appium server configuration
│   ├── devices.ts              # Device definitions
│   └── env.ts                  # Environment config
├── tests/
│   ├── login/
│   │   └── login.spec.ts
│   ├── home/
│   │   └── home.spec.ts
│   └── smoke/
│       └── smoke.spec.ts
├── pages/                      # Page Object Model
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── home.page.ts
│   └── common/
│       └── bottom-nav.page.ts
├── utils/
│   ├── driver.ts               # Appium driver wrapper
│   ├── wait.helper.ts
│   ├── gesture.helper.ts
│   └── logger.ts
├── test-data/
│   ├── users.json
│   └── constants.ts
├── fixtures/
│   └── mobile.fixture.ts       # Playwright custom fixture
├── reports/
├── scripts/
│   ├── start-appium.ps1
│   └── start-appium.sh
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Installation

### Prerequisites

- Node.js >= 18
- Java JDK 11+
- Android SDK with `adb`
- Appium 2.x

### Setup

```bash
# Install dependencies
npm install

# Install Appium globally
npm install -g appium
appium driver install uiautomator2

# Verify installation
adb devices
appium --version
```

## Device Configuration

### Step 1: Get device information

```bash
# Get Device ID
adb devices

# Get Android version
adb shell getprop ro.build.version.release

# Get app package and activity
adb shell dumpsys window | findstr mCurrentFocus
```

### Step 2: Update `config/devices.ts`

```typescript
export const devices = {
  realDevice: {
    deviceName: 'Samsung Galaxy S21',
    platformName: 'Android',
    platformVersion: '13',
    udid: 'RF8M33XXXXX',
    app: './apps/demo-app.apk',
    appPackage: 'com.example.app',
    appActivity: 'com.example.MainActivity',
  },
};
```

### Step 3: Update selectors in Page files

Update selectors in `pages/login.page.ts` and `pages/home.page.ts` to match your app.

## Running Tests

### Start Appium Server

```bash
# Windows PowerShell
.\scripts\start-appium.ps1

# Or directly
npm run appium:start
```

### Run Tests

```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run login tests
npm run test:login

# Run specific test file
npx playwright test tests/login/login.spec.ts
```

## View Reports

```bash
# Playwright HTML Report
npm run report

# Allure Report
npm run allure:generate
npm run allure:open
```

## Writing New Tests

### Create a Page Object

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

### Create a Test File

```typescript
// tests/product/product.spec.ts
import { test, expect } from '../../fixtures/mobile.fixture';

test.describe('Product Tests', () => {
  test('Add product to cart', async ({ driver }) => {
    // Test implementation
  });
});
```

## Selector Types

```typescript
// Accessibility ID (recommended)
'~elementId'

// Resource ID
'id=com.example:id/element_id'

// descriptionContain(text)
'android=new UiSelector().descriptionContains("Seekers Alliance")'

// Android UIAutomator
'android=new UiSelector().text("Login")'

// XPath -> do not recommend
'//android.widget.Button[@text="Login"]'

// Class name
'android.widget.EditText'
```

## Troubleshooting

### Error: "Could not start a new session"
- Check Appium server is running
- Verify device is connected (`adb devices`)
- Check device config in `config/devices.ts`

### Error: "Element not found"
- Verify selector is correct
- Add wait before finding element
- Use Appium Inspector to verify selector

### Error: "App not installed"
- Check APK path is correct
- Verify APK exists in `apps/` folder
