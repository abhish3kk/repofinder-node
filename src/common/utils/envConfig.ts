import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  SECRET_KEY: str({ devDefault: crypto.randomUUID() }),
  PAT_TOKEN_GITHUB: str({ devDefault: crypto.randomUUID() }),
});

export const endpoints = {
  GITHUB_SEARCH_REPOS: "https://api.github.com/search/repositories",
  GITHUB_STARRED_REPOS: "https://api.github.com/user/starred",
};
