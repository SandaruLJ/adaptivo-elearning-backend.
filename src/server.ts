import express from "express";
import config from "./config/config.js";
import { Logger } from "./loaders/logger.js";
import loaders from "./loaders/index.js";

async function startServer() {
  const app = express();
  const logger = Logger.getInstance();
  await loaders(app);

  app
    .listen(config.port, "0.0.0.0", () => {
      logger.info(`Server is running on port ${config.port}`);
    })
    .on("error", (err) => {
      logger.error(err.toString());
    });
}

startServer().then();
