import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
// if (envFound.error) {
//     // This error should crash whole process
//     throw new Error("Couldn't find .env file");
// }

export default {
  port: parseInt(process.env.PORT || "3005", 10),
  dbURL: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  version: process.env.BE_VERSION,
  awsRegion: process.env.AWS_DEFAULT_REGION,
  userPoolId: process.env.USER_POOL_ID,
  adminPoolId: process.env.ADMIN_POOL_ID,
};
