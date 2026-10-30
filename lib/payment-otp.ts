export interface OTPRecord {
  otp: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}

export interface SendRecord {
  count: number;
  windowStart: number;
}

// Global singleton map to prevent state fragmentation across Next.js dev server reloads
const globalForOtp = globalThis as unknown as {
  paymentOtpStore?: Map<string, OTPRecord>;
  paymentSendCounts?: Map<string, SendRecord>;
  paymentLockouts?: Map<string, number>;
};

export const otpStore = globalForOtp.paymentOtpStore ?? new Map<string, OTPRecord>();
export const sendCounts = globalForOtp.paymentSendCounts ?? new Map<string, SendRecord>();
export const lockouts = globalForOtp.paymentLockouts ?? new Map<string, number>();

if (process.env.NODE_ENV !== "production") {
  globalForOtp.paymentOtpStore = otpStore;
  globalForOtp.paymentSendCounts = sendCounts;
  globalForOtp.paymentLockouts = lockouts;
}

export const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
export const MAX_SENDS_PER_WINDOW = 5; // Up to 5 requests per hour
export const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
export const MAX_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function cleanupExpired(): void {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt + 60_000) {
      otpStore.delete(email);
    }
  }
  for (const [email, data] of sendCounts.entries()) {
    if (now - data.windowStart > RATE_LIMIT_WINDOW) {
      sendCounts.delete(email);
    }
  }
  for (const [email, lockedUntil] of lockouts.entries()) {
    if (now > lockedUntil) {
      lockouts.delete(email);
    }
  }
}

