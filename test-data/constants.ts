export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 10000,
  LONG: 30000,
  PAGE_LOAD: 60000,
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Invalid username or password',
  REQUIRED_FIELD: 'Please fill in all required fields',
  NETWORK_ERROR: 'Network connection error',
  SESSION_EXPIRED: 'Session expired',
};

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,11}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
};

export const TAGS = {
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  LOGIN: '@login',
  HOME: '@home',
  CRITICAL: '@critical',
};

export const SCREENS = {
  LOGIN: 'Login Screen',
  HOME: 'Home Screen',
  PROFILE: 'Profile Screen',
  SETTINGS: 'Settings Screen',
  CART: 'Cart Screen',
};
