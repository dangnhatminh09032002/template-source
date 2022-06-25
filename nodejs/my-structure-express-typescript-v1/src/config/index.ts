import dotenv from "dotenv";
import path from "path";
import * as _ from "lodash";

import { splitCommaToArray } from "../loaders";

const envFound = dotenv.config({
  path: path.resolve(__dirname, "../../development.env"),
});

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  session: {
    name: process.env.SESSION_NAME,
    secret: Boolean(process.env.SESSION_SECRET),
  },
  cookie: {
    httpOnly: Boolean(process.env.COOKIE_HTTPONLY),
    maxAge: Number(process.env.COOKIE_MAXAGE),
    secure: process.env.COOKIE_SECURE,
  },
  cors: {
    origins: splitCommaToArray(process.env.CORS_ORIGINS),
    methods: splitCommaToArray(process.env.CORS_METHODS),
  },
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
};

export default config;
