import express, { Application } from "express";
import http, { Server } from "http";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import appConfig from "./config";

export const app: Application = express();
const server: Server = http.createServer(app);

async function bootstrap() {
  // Check env has null?
  if (appConfig.nodeEnv == "development") {
    app.use(morgan("dev"));
  }

  app.use(
    session({
      name: appConfig.session.name,
      secret: appConfig.session.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: appConfig.cookie.httpOnly,
        secure: appConfig.cookie.secure,
        maxAge: appConfig.cookie.maxAge,
      },
    }),
  );

  app.use(
    cors({
      origin: appConfig.cors.origins,
      methods: appConfig.cors.methods,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(express.static(path.resolve(__dirname, "./public")));

  server.listen(appConfig.port, () => {
    console.info("server", `Server started on port ${appConfig.port}`);
  });
}
bootstrap();
