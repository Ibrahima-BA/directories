import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./kv";

// Mock pour le développement local
const isDevelopment = process.env.NODE_ENV === 'development' || 
  process.env.UPSTASH_REDIS_REST_URL?.includes('placeholder') ||
  process.env.UPSTASH_REDIS_REST_URL?.includes('demo');

const mockRatelimit = {
  limit: async () => ({ success: true, limit: 10, remaining: 9, reset: Date.now() + 60000 }),
};

export const generateRuleRatelimit = isDevelopment ? mockRatelimit as any : new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

export const createPostRatelimit = isDevelopment ? mockRatelimit as any : new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1m"),
});
