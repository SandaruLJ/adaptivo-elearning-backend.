import { IUserActivity } from "../interfaces/IUserActivity.js";
import { Logger } from "../loaders/logger.js";
import { IUserActivityService } from "./interfaces/IUserActivityService.js";
import { UserActivityDao } from "../dao/UserActivityDao.js";

export class UserActivityService implements IUserActivityService {
  private logger = Logger.getInstance();
  public static instance: UserActivityService = null;
  private UserActivityDao = UserActivityDao.getInstance();
  public static getInstance(): UserActivityService {
    if (this.instance === null) {
      this.instance = new UserActivityService();
    }
    return this.instance;
  }

  public async createUserActivity(request: IUserActivity): Promise<IUserActivity> {
    this.logger.info("UserActivityService - createUserActivity()");

    return this.UserActivityDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllUserActivity(): Promise<IUserActivity[]> {
    this.logger.info("UserActivityService - getAllUserActivity()");
    return this.UserActivityDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
