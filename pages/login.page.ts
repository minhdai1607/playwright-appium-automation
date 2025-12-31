import { Browser } from 'webdriverio';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  
  private selectors = {
    usernameInput: '~username',           // Thay bằng ID thực tế
    passwordInput: '~password',           // Thay bằng ID thực tế  
    loginButton: '~loginButton',          // Thay bằng ID thực tế
    errorMessage: '~errorMessage',        // Thay bằng ID thực tế
    forgotPasswordLink: '~forgotPassword', // Thay bằng ID thực tế
    registerLink: '~register',            // Thay bằng ID thực tế
  };

  constructor(driver: Browser) {
    super(driver);
  }
  async enterUsername(username: string): Promise<void> {
    logger.info(`📝 Nhập username: ${username}`);
    await this.type(this.selectors.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    logger.info(`📝 Nhập password: ****`);
    await this.type(this.selectors.passwordInput, password);
  }

  /**
   * Click nút Login
   */
  async clickLoginButton(): Promise<void> {
    logger.info(`🖱️ Click nút Login`);
    await this.hideKeyboard();
    await this.click(this.selectors.loginButton);
  }

  /**
   * Login với username và password
   */
  async login(username: string, password: string): Promise<void> {
    logger.step(1, 'Nhập thông tin đăng nhập');
    await this.enterUsername(username);
    await this.enterPassword(password);
    
    logger.step(2, 'Click nút Login');
    await this.clickLoginButton();
  }

  /**
   * Lấy error message
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.selectors.errorMessage);
  }

  /**
   * Kiểm tra error message có hiển thị không
   */
  async isErrorDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.selectors.errorMessage);
  }

  /**
   * Click Forgot Password
   */
  async clickForgotPassword(): Promise<void> {
    await this.click(this.selectors.forgotPasswordLink);
  }

  /**
   * Click Register
   */
  async clickRegister(): Promise<void> {
    await this.click(this.selectors.registerLink);
  }

  /**
   * Kiểm tra đang ở trang Login
   */
  async isOnLoginPage(): Promise<boolean> {
    return this.isDisplayed(this.selectors.loginButton);
  }
}


