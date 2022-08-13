import { IUserCourse } from "../interfaces/IUserCourse.js";
import { Logger } from "../loaders/logger.js";
import { IUserCourseService } from "./interfaces/IUserCourseService.js";
import { UserCourseDao } from "../dao/UserCourseDao.js";
import { CourseService } from "./CourseService.js";
import { ICourse } from "../interfaces/ICourse.js";

import { UserService } from "./UserService.js";
import { adaptUserCourse } from "../recommendation/user_course_adaptor.js";

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

    // const course: any = await CourseService.getInstance().getCourseById(request.courseId);
    // let temp = course.curriculum;
    // let sectionCount = 0;
    // for (let section of temp) {
    //   let unitCount = 0;
    //   for (let unit of section.units) {
    //     const newUnit = {
    //       ...unit._doc,
    //       isCompleted: false,
    //       duration: "0",
    //       currentUnit: {
    //         sectionNum: 0,
    //         unitNum: 0,
    //         duration: 0,
    //       },
    //       quiz: {
    //         questions: unit._doc.quiz,
    //         score: 0,
    //         analysis: {},
    //       },
    //     };
    //     temp[sectionCount]["units"][unitCount]._doc = newUnit;

    //     unitCount++;
    //   }
    //   sectionCount++;
    // }
    // request.learningPath = temp;

    try {
      request.learningPath = await adaptUserCourse(request.userId, request.courseId);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }

    request.currentUnit = {
      sectionNum: 0,
      unitNum: 0,
      duration: 0,
    };

    request.progress = 0;
    // return request;
    return this.UserCourseDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async markIsCompleted(request: any): Promise<IUserCourse | Object> {
    this.logger.info("UserCourseService - markIsCompleted()");
    const userCourse: any = await this.getUserCourseById(request._id);
    userCourse.learningPath[request.sectionCount]["units"][request.unitCount].isCompleted = request.isCompleted;

    const progress = this.calculateProgress(userCourse);

    userCourse.progress = progress;
    return this.UserCourseDao.update(request._id, userCourse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async markDuration(request: any): Promise<IUserCourse | Object> {
    this.logger.info("UserCourseService - markDuration()");
    const userCourse: any = await this.getUserCourseById(request._id);
    userCourse.learningPath[request.sectionCount]["units"][request.unitCount].duration = request.duration;

    return this.UserCourseDao.update(request._id, userCourse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async setQuizScore(request: any): Promise<IUserCourse | Object> {
    this.logger.info("UserCourseService - setQuizScore()");
    const userCourse: any = await this.getUserCourseById(request._id);

    if (userCourse.learningPath[request.sectionCount]["units"][request.unitCount].quiz.score > 0) {
      return request;
    }

    userCourse.learningPath[request.sectionCount]["units"][request.unitCount].quiz.score = request.score;

    if (request.hasOwnProperty("analysis")) {
      userCourse.learningPath[request.sectionCount]["units"][request.unitCount].quiz.analysis = request.analysis;
    }

    return this.UserCourseDao.update(request._id, userCourse)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public calculateProgress(userCourse: any): Number {
    this.logger.info("UserCourseService - calculateProgress()");

    let totUnitCount = 0;
    let completedUnitCount = 0;
    for (let section of userCourse.learningPath) {
      for (let unit of section.units) {
        if (unit.isCompleted == true) {
          completedUnitCount++;
        }
        totUnitCount++;
      }
    }
    let progress = (completedUnitCount / totUnitCount) * 100;
    return progress;
  }

  public async changeCurrentUnit(request: any): Promise<IUserCourse | Object> {
    this.logger.info("UserCourseService - changeCurrentUnit()");
    const userCourse: any = await this.getUserCourseById(request._id);
    userCourse.currentUnit = {
      sectionNum: request.sectionNum,
      unitNum: request.unitNum,
    };
    console.log(userCourse.currentUnit);
    return this.UserCourseDao.update(request._id, userCourse)
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
  public async getUserCourseByUserId(email: string): Promise<IUserCourse[]> {
    this.logger.info("UserCourseService - getUserCourseByUserId()");
    const userId = await UserService.getInstance().getUserIdByEmail(email);
    return this.UserCourseDao.getByUserId(userId)
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
    return this.UserCourseDao.updateCurriculum(id, Course)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateCurriculum(id: string, learningPath: any): Promise<IUserCourse | Object> {
    this.logger.info("UserCourseService - updateCurriculum()");

    const userCourse: any = await this.getUserCourseById(id);
    userCourse.learningPath = learningPath;

    return this.UserCourseDao.updateCurriculum(id, userCourse)
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
