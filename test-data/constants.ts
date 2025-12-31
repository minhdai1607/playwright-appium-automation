/**
 * Test Constants
 * Các hằng số dùng trong test
 */

// Thời gian chờ (ms)
export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 10000,
  LONG: 30000,
  PAGE_LOAD: 60000,
};

// Messages thường gặp
export const MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGIN_FAILED: 'Sai tên đăng nhập hoặc mật khẩu',
  REQUIRED_FIELD: 'Vui lòng điền đầy đủ thông tin',
  NETWORK_ERROR: 'Lỗi kết nối mạng',
  SESSION_EXPIRED: 'Phiên đăng nhập hết hạn',
};

// Validation patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,11}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
};

// Test tags
export const TAGS = {
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  LOGIN: '@login',
  HOME: '@home',
  CRITICAL: '@critical',
};

// Screen names
export const SCREENS = {
  LOGIN: 'Login Screen',
  HOME: 'Home Screen',
  PROFILE: 'Profile Screen',
  SETTINGS: 'Settings Screen',
  CART: 'Cart Screen',
};


