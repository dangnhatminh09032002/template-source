import express, { Application } from "express";
import http, { Server } from "http";
import dotenv from "dotenv";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import * as _ from "lodash";

dotenv.config({ path: path.resolve(__dirname, "../development.env") });

export const app: Application = express();
const server: Server = http.createServer(app);

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  SESSION_NAME: process.env.SESSION_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  COOKIE_HTTPONLY: Boolean(process.env.COOKIE_HTTPONLY),
  COOKIE_SECURE: Boolean(process.env.COOKIE_SECURE),
  COOKIE_MAXAGE: Number(process.env.COOKIE_MAXAGE),
  PORT: Number(process.env.PORT),
};

async function bootstrap() {
  // Check env has null?
  if (_.isNil(processEnv.NODE_ENV) || processEnv.NODE_ENV == "development") {
    Object.entries(processEnv).forEach((keyValue: [string, any]) => {
      const [key, value] = keyValue;
      if (_.isNil(value)) throw new Error(`${key} is undefined or Null`);
      if (_.isNaN(value)) throw new Error(`${key} is undefined or NaN`);
    });

    app.use(morgan("dev"));
  }

  app.use(
    session({
      name: processEnv.SESSION_NAME,
      secret: processEnv.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: processEnv.COOKIE_HTTPONLY,
        secure: processEnv.COOKIE_SECURE,
        maxAge: processEnv.COOKIE_MAXAGE,
      },
    })
  );

  app.use(
    cors({
      origin: _.map(
        _.split(process.env.CORS_ORIGINS || "", ","),
        (url: string) => _.trim(url)
      ),
      credentials: true,
      methods: _.map(
        _.split(process.env.CORS_METHODS || "", ","),
        (url: string) => _.trim(url)
      ),
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(express.static(path.resolve(__dirname, "./public")));

  server.listen(processEnv.PORT, () => {
    console.info("server", `Server started on port ${processEnv.PORT}`);
  });
}
bootstrap();
