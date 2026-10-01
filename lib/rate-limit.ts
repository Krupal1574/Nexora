import "server-only";

// NOTE: This in-memory rate limiter is instance-local. 
// It does NOT provide distributed, global rate-limiting across all serverless 
// instances (e.g., on Vercel). It is useful for basic mitigation, but 
// a distributed store (like Redis/Upstash) should be used for production 
// global rate-limiting.

const rateLimitStore = new Map<string, number[]>();

export type RateLimitAction = 
  | "contact" 
  | "referral" 
  | "login" 
  | "register" 
  | "forgot_password" 
  | "reset_password";

const ACTION_CONFIGS: Record<RateLimitAction, { windowMs: number; maxRequests: number }> = {
  contact: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 per 15 min
  referral: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 per 15 min
  login: { windowMs: 15 * 60 * 1000, maxRequests: 10 }, // 10 per 15 min
  register: { windowMs: 60 * 60 * 1000, maxRequests: 5 }, // 5 per hour
  forgot_password: { windowMs: 15 * 60 * 1000, maxRequests: 3 }, // 3 per 15 min
  reset_password: { windowMs: 15 * 60 * 1000, maxRequests: 3 }, // 3 per 15 min
};

function purgeExpiredEntries(now: number) {
  for (const [key, timestamps] of rateLimitStore) {
    const action = key.split(":")[0] as RateLimitAction;
    const config = ACTION_CONFIGS[action] || { windowMs: 15 * 60 * 1000 };
    const recent = timestamps.filter((timestamp) => now - timestamp < config.windowMs);
    
    if (recent.length > 0) {
      rateLimitStore.set(key, recent);
    } else {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Checks if the given IP address is rate-limited for the specified action.
 * Returns `true` if rate-limited, `false` otherwise.
 */
export function isRateLimited(action: RateLimitAction, ip: string): boolean {
  const now = Date.now();
  
  // Occasionally purge expired entries (could be done more optimally)
  if (Math.random() < 0.1) {
    purgeExpiredEntries(now);
  }

  const key = `${action}:${ip}`;
  const timestamps = rateLimitStore.get(key) ?? [];
  const config = ACTION_CONFIGS[action];

  // Filter out timestamps older than the window
  const recentTimestamps = timestamps.filter(t => now - t < config.windowMs);

  if (recentTimestamps.length >= config.maxRequests) {
    return true; // Rate limited
  }

  recentTimestamps.push(now);
  rateLimitStore.set(key, recentTimestamps);

  return false;
}
