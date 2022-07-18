import { Logger } from "../loaders/logger.js";
import { IUserActivity } from "../interfaces/IUserActivity.js";
import UserActivity from "../models/UserActivity.js";

export class UserActivityDao {
  private logger = Logger.getInstance();
  public static instance: UserActivityDao = null;

  public static getInstance(): UserActivityDao {
    if (this.instance === null) {
      this.instance = new UserActivityDao();
    }
    return this.instance;
  }

  public async save(request: IUserActivity) {
    this.logger.info("UserActivityDao - save()");
    const userActivity = new UserActivity(request);
    return userActivity
      .save()
      .then((data) => {
        this.logger.info(`UserActivity Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting UserActivity" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("UserActivityDao - getAll()");
    return UserActivity.find({})
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`UserActivity Retrieved Successfully`);
        } else {
          this.logger.info(`UserActivity Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving UserActivity" + error.message);
        throw error;
      });
  }
}
