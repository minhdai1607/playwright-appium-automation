type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.getTimestamp();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage('info', message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage('warn', message));
  }

  error(message: string): void {
    console.error(this.formatMessage('error', message));
  }

  debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.log(this.formatMessage('debug', message));
    }
  }

  step(stepNumber: number, description: string): void {
    console.log(`\nStep ${stepNumber}: ${description}`);
  }

  testStart(testName: string): void {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`TEST: ${testName}`);
    console.log(`${'='.repeat(60)}`);
  }

  testEnd(testName: string, passed: boolean): void {
    const status = passed ? 'PASSED' : 'FAILED';
    console.log(`\n${status}: ${testName}`);
    console.log(`${'='.repeat(60)}\n`);
  }
}

export const logger = new Logger();
