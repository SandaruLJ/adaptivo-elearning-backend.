import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";
import { Logger } from "./logger.js";
export default async (expressApp: any) => {
  const logger = Logger.getInstance();
  await mongooseLoader();
  logger.info("MongoDB Initialized");
  await expressLoader({ app: expressApp });
  logger.info("Express Initialized");
};
