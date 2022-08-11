import { Logger } from "../loaders/logger.js";
import IUser from "../interfaces/IUser.js";
import User from "../models/User.js";
import UserNotFoundError from "../errors/UserNotFoundError.js";

export default class UserDao {
  private logger = Logger.getInstance();

  public static instance: UserDao = null;
  public static getInstance(): UserDao {
    if (this.instance == null) {
      this.instance = new UserDao();
    }

    return this.instance;
  }

  public async save(request: IUser) {
    this.logger.info("UserDao - save()");
    const user = new User(request);
    return await user.save().then((data) => {
      this.logger.info(`User "${data.firstname} ${data.lastname}" inserted successfully.`);
      return data;
    });
  }

  public async getAll() {
    this.logger.info("UserDao - getAll()");

    return await User.find({}).then((data) => {
      if (data.length > 0) {
        this.logger.info("Users retrieved successfully.");
      } else {
        this.logger.error("Users not found.");
      }

      return data;
    });
  }

  public async getById(id: string) {
    this.logger.info("UserDao - getById()");

    return await User.findById(id).then((data) => {
      if (data) {
        this.logger.info(`User "${data.firstname} ${data.lastname}" retrieved successfully.`);
        return data;
      } else {
        throw new UserNotFoundError(`User '${id}' not found`);
      }
    });
  }

  public async getIdByEmail(email: string) {
    this.logger.info("UserDao - getIdByEmail()");

    return await User.find({ email }).then((data) => {
      if (data.length > 0) {
        this.logger.info("Users retrieved successfully.");
        return data[0];
      } else {
        this.logger.error("Users not found.");
        throw new UserNotFoundError(`User '${email}' not found`);
      }
    });
  }

  public async update(id: string, user: IUser) {
    this.logger.info("UserDao - update()");

    return await User.findByIdAndUpdate(id, user, { new: true }).then((data) => {
      if (data) {
        this.logger.info(`User "${data.firstname} ${data.lastname}" updated successfully`);
        return data;
      } else {
        throw new UserNotFoundError(`User '${id}' not found`);
      }
    });
  }

  public async delete(id: string) {
    this.logger.info("UserDao - delete()");

    return await User.findByIdAndDelete(id).then((data) => {
      if (data) {
        this.logger.info(`User "${data.firstname} ${data.lastname}" deleted successfully.`);
        return data;
      } else {
        throw new UserNotFoundError(`User '${id}' not found`);
      }
    });
  }
}
