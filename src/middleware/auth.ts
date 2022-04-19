import config from "../config/config.js";
import { Logger } from "../loaders/logger.js";
import pkg from "cognito-express";
const { CognitoExpress } = pkg;

const logger = Logger.getInstance();

enum Client {
  USER = "user",
  ADMIN = "admin",
}

export default (req: any, res: any, next: any) => {
  const client = req.headers.client;

  if (!Object.values(Client).includes(client)) {
    res.status(400).send({ err: "Invalid client type" });
    logger.error("Invalid client type provided in the request");
    return;
  }

  // Setup CognitoExpress
  const cognitoExpress = new CognitoExpress({
    region: config.awsRegion,
    cognitoUserPoolId: client === Client.ADMIN ? config.adminPoolId : config.userPoolId,
    tokenUse: "access",
    tokenExpiration: 3600,
  });

  // Check whether the request contains a token
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    // Validate the token
    logger.info("Validating authorization token");
    const token = req.headers.authorization.split(" ")[1];
    cognitoExpress.validate(token, (err: any) => {
      if (err) {
        // In case of an error, return a 401 Unauthorized along with the error
        logger.error("Authorization token validation failed");
        res.status(401).send({ err: err.message });
      } else {
        // If no error occurs, then the API is authenticated.
        logger.info("Authorization token validation successful");
        next();
      }
    });
  } else {
    // In case there was no token, return a 401 Unauthorized
    const noTokenMsg = "No authorization token provided";
    logger.error(noTokenMsg);
    res.status(401).send({ err: noTokenMsg });
  }
};
