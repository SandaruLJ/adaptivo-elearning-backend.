import { Logger } from "../loaders/logger.js";
import { IUserCourse } from "../interfaces/IUserCourse.js";
import UserCourse from "../models/UserCourse.js";

export class UserCourseDao {
  private logger = Logger.getInstance();
  public static instance: UserCourseDao = null;

  public static getInstance(): UserCourseDao {
    if (this.instance === null) {
      this.instance = new UserCourseDao();
    }
    return this.instance;
  }

  public async save(request: IUserCourse) {
    this.logger.info("UserCourseDao - save()");
    const userCourse = new UserCourse(request);
    return userCourse
      .save()
      .then((data) => {
        this.logger.info(`UserCourse ${data._id} Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting UserCourse" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("UserCourseDao - getAll()");
    return UserCourse.find({})
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`UserCourse Retrieved Successfully`);
        } else {
          this.logger.info(`UserCourse Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving UserCourse" + error.message);
        throw error;
      });
  }

  public async getById(id: string) {
    this.logger.info("UserCourseDao - getById()");
    return UserCourse.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data._id} UserCourse Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`UserCourse ${id} Not Found`);
          return { msg: "UserCourse Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving UserCourse ${id} ${error.message}`);
        throw error;
      });
  }

  public async getByUserId(id: string) {
    this.logger.info("UserCourseDao - getByUserId()");
    return UserCourse.find({ userId: id })
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`UserCourse Retrieved Successfully`);
        } else {
          this.logger.info(`UserCourse Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving UserCourse" + error.message);
        throw error;
      });
  }

  public async update(id: string, course: IUserCourse) {
    this.logger.info("UserCourseDao - update()");
    return UserCourse.findByIdAndUpdate(id, { $set: course }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data._id} UserCourse Updated Successfully`);
          return data;
        } else {
          this.logger.info(`UserCourse ${id} Not Found`);
          return { msg: "UserCourse Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating UserCourse ${id} ${error.message}`);
        throw error;
      });
  }

  public async updateCurriculum(id: string, learningPath: any) {
    this.logger.info("UserCourseDao - updateCurriculum()");
    return UserCourse.findByIdAndUpdate(id, { $set: learningPath }, { upsert: true, new: true });
  }

  public async delete(id: string) {
    this.logger.info("UserCourseDao - delete()");
    return UserCourse.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data._id} UserCourse Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`UserCourse ${id} Not Found`);
          return { msg: "UserCourse Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting UserCourse ${id} ${error.message}`);
        throw error;
      });
  }
}
