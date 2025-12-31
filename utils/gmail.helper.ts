import { env } from '../config/env';
import { logger } from './logger';

interface GmailMessage {
  id: string;
  threadId: string;
}

interface GmailMessageDetail {
  payload: {
    headers: Array<{ name: string; value: string }>;
    body?: { data?: string };
    parts?: Array<{ body?: { data?: string } }>;
  };
  snippet: string;
}

export class GmailHelper {
  private accessToken: string | null = null;

  async refreshAccessToken(): Promise<string> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.gmail.clientId,
        client_secret: env.gmail.clientSecret,
        refresh_token: env.gmail.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh access token: ${response.statusText}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    return this.accessToken;
  }

  async getLatestEmail(query: string = ''): Promise<GmailMessageDetail | null> {
    if (!this.accessToken) {
      await this.refreshAccessToken();
    }

    const searchQuery = query || `to:${env.testUser.username}`;
    const listUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(searchQuery)}&maxResults=1`;

    const listResponse = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    if (!listResponse.ok) {
      if (listResponse.status === 401) {
        await this.refreshAccessToken();
        return this.getLatestEmail(query);
      }
      throw new Error(`Failed to list emails: ${listResponse.statusText}`);
    }

    const listData = await listResponse.json();
    const messages: GmailMessage[] = listData.messages || [];

    if (messages.length === 0) {
      logger.info('No emails found');
      return null;
    }

    const messageUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messages[0].id}`;
    const messageResponse = await fetch(messageUrl, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    if (!messageResponse.ok) {
      throw new Error(`Failed to get email: ${messageResponse.statusText}`);
    }

    return messageResponse.json();
  }

  async getOTP(options: {
    subject?: string;
    sender?: string;
    otpLength?: number;
    maxWaitTime?: number;
    pollInterval?: number;
  } = {}): Promise<string | null> {
    const {
      subject = '',
      sender = '',
      otpLength = 6,
      maxWaitTime = 60000,
      pollInterval = 5000,
    } = options;

    logger.info('Waiting for OTP email...');

    const startTime = Date.now();
    let query = `is:unread`;
    if (subject) query += ` subject:${subject}`;
    if (sender) query += ` from:${sender}`;

    while (Date.now() - startTime < maxWaitTime) {
      try {
        const email = await this.getLatestEmail(query);

        if (email) {
          const body = this.getEmailBody(email);
          const otp = this.extractOTP(body, otpLength);

          if (otp) {
            logger.info(`OTP found: ${otp}`);
            await this.markAsRead(email);
            return otp;
          }
        }
      } catch (error) {
        logger.error(`Error fetching email: ${error}`);
      }

      logger.info(`No OTP found, retrying in ${pollInterval / 1000}s...`);
      await this.sleep(pollInterval);
    }

    logger.error('Timeout waiting for OTP email');
    return null;
  }

  private getEmailBody(email: GmailMessageDetail): string {
    let body = '';

    if (email.payload.body?.data) {
      body = this.decodeBase64(email.payload.body.data);
    } else if (email.payload.parts) {
      for (const part of email.payload.parts) {
        if (part.body?.data) {
          body += this.decodeBase64(part.body.data);
        }
      }
    }

    if (!body) {
      body = email.snippet || '';
    }

    return body;
  }

  private decodeBase64(encoded: string): string {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  private extractOTP(text: string, length: number): string | null {
    // Pattern to match OTP codes
    const patterns = [
      new RegExp(`\\b(\\d{${length}})\\b`),           // Exact length digits
      /verification code[:\s]*(\d{4,8})/i,            // "verification code: 123456"
      /otp[:\s]*(\d{4,8})/i,                          // "OTP: 123456"
      /code[:\s]*(\d{4,8})/i,                         // "code: 123456"
      /mã xác thực[:\s]*(\d{4,8})/i,                  // Vietnamese: "mã xác thực: 123456"
      /mã otp[:\s]*(\d{4,8})/i,                       // Vietnamese: "mã OTP: 123456"
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }
  
}
