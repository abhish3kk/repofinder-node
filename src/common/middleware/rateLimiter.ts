import type { Request } from "express";
import { rateLimit } from "express-rate-limit";

import { env } from "@/common/utils/envConfig";

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: {
    error: "Too many requests, please try again later.",
    retryAfter: `${Math.ceil((15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS) / 1000 / 60)} + minutes`,
  },
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => req.ip as string,
  skip: (req) => req.path === "/health-check",
});

export default rateLimiter;
