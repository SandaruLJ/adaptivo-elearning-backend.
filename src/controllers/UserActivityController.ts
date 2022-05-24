import { Logger } from "../loaders/logger.js";
import { UserActivityService } from "../services/UserActivityService.js";
import { IUserActivity } from "../interfaces/IUserActivity.js";
import { IUserActivityService } from "../services/interfaces/IUserActivityService.js";
import UserActivity from "../models/UserActivity.js";

import autoBind from "auto-bind";

export default class UserActivityController {
  private logger: Logger;
  private UserActivityService: IUserActivityService;

  constructor() {
    this.logger = Logger.getInstance();
    this.UserActivityService = UserActivityService.getInstance();
    autoBind(this);
  }

  public async createUserActivity(req: any, res: any) {
    this.logger.info("UserActivityController - createUserActivity()");

    if (req.body) {
      const UserActivity: IUserActivity = req.body;

      await this.UserActivityService.createUserActivity(UserActivity)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllUserActivity(req: any, res: any) {
    this.logger.info("UserActivityController - getAllUserActivity()");

    await this.UserActivityService.getAllUserActivity()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
}
