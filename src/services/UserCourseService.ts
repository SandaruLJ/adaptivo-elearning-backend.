import { IUserCourse } from "../interfaces/IUserCourse.js";
import { Logger } from "../loaders/logger.js";
import { IUserCourseService } from "./interfaces/IUserCourseService.js";
import { UserCourseDao } from "../dao/UserCourseDao.js";
import { CourseService } from "./CourseService.js";
import { ICourse } from "../interfaces/ICourse.js";

export class UserCourseService implements IUserCourseService {
  private logger = Logger.getInstance();
  public static instance: UserCourseService = null;
  private UserCourseDao = UserCourseDao.getInstance();
  public static getInstance(): UserCourseService {
    if (this.instance === null) {
      this.instance = new UserCourseService();
    }
    return this.instance;
  }

  public async createUserCourse(request: IUserCourse): Promise<IUserCourse> {
    this.logger.info("UserCourseService - createUserCourse()");
    const course: any = await CourseService.getInstance().getCourseById(request.courseId);
    let temp = course.curriculum;
    let sectionCount = 0;
    for (let section of temp) {
      let unitCount = 0;
      for (let unit of section.units) {
        const newUnit = {
          ...unit._doc,
          isCompleted: false,
          duration: "0",
        };
        temp[sectionCount]["units"][unitCount]._doc = newUnit;

        unitCount++;
      }
      sectionCount++;
    }
    request.learningPath = temp;
    request.progress = 0;

    return this.UserCourseDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async getAllUserCourse(): Promise<IUserCourse[]> {
    this.logger.info("UserCourseService - getAllUserCourse()");
    return this.UserCourseDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getUserCourseById(id: string): Promise<IUserCourse | Object> {
    this.logger.info("UserCourseService - getUserCourseById()");
    return this.UserCourseDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateUserCourse(id: string, Course: IUserCourse): Promise<IUserCourse | Object> {
    this.logger.info("Customer Services - updateCustomer()");
    return this.UserCourseDao.update(id, Course)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteUserCourse(id: string): Promise<IUserCourse | Object> {
    this.logger.info("UserCourseService - deleteUserCourse()");
    return this.UserCourseDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
