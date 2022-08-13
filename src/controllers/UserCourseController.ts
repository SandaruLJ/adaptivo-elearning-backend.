import { Logger } from "../loaders/logger.js";
import { UserCourseService } from "../services/UserCourseService.js";
import { IUserCourse } from "../interfaces/IUserCourse.js";
import { IUserCourseService } from "../services/interfaces/IUserCourseService.js";
import UserCourse from "../models/UserCourse.js";

import autoBind from "auto-bind";
import { UserService } from "../services/UserService.js";
import IUser from "../interfaces/IUser.js";

export default class UserCourseController {
  private logger: Logger;
  private UserCourseService: IUserCourseService;

  constructor() {
    this.logger = Logger.getInstance();
    this.UserCourseService = UserCourseService.getInstance();
    autoBind(this);
  }

  public async createUserCourse(req: any, res: any) {
    this.logger.info("UserCourseController - createUserCourse()");

    if (req.body) {
      const UserCourse: IUserCourse = req.body;

      await this.UserCourseService.createUserCourse(UserCourse)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllUserCourse(req: any, res: any) {
    this.logger.info("UserCourseController - getAllUserCourse()");

    await this.UserCourseService.getAllUserCourse()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getUserCourseById(req: any, res: any) {
    this.logger.info("UserCourseController - getUserCourseById()");
    const id = req.params.id;
    await this.UserCourseService.getUserCourseById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async getUserCourseByUserId(req: any, res: any) {
    this.logger.info("UserCourseController - getUserCourseByUserId()");
    const email = req.params.email;
    await this.UserCourseService.getUserCourseByUserId(email)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async updateUserCourse(req: any, res: any) {
    this.logger.info("UserCourseController - updateUserCourse()");
    const id = req.params.id;

    if (req.body) {
      const UserCourse: IUserCourse = req.body;

      await this.UserCourseService.updateUserCourse(id, UserCourse)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }

  public async updateCurriculum(req: any, res: any) {
    this.logger.info("UserCourseController - updateCurriculum()");
    const id = req.params.id;

    if (req.body) {
      const learningPath: any = req.body.learningPath;
      console.log(learningPath);

      await this.UserCourseService.updateCurriculum(id, learningPath)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }

  public async markIsCompleted(req: any, res: any) {
    this.logger.info("UserCourseController - markIsCompleted()");

    if (req.body) {
      const request = req.body;

      await this.UserCourseService.markIsCompleted(request)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }
  public async setQuizScore(req: any, res: any) {
    this.logger.info("UserCourseController - markIsCompleted()");

    if (req.body) {
      const request = req.body;

      await this.UserCourseService.setQuizScore(request)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }
  public async markDuration(req: any, res: any) {
    this.logger.info("UserCourseController - markDuration()");

    if (req.body) {
      const request = req.body;

      await this.UserCourseService.markDuration(request)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }

  public async changeCurrentUnit(req: any, res: any) {
    this.logger.info("UserCourseController - changeCurrentUnit()");

    if (req.body) {
      const request = req.body;

      await this.UserCourseService.changeCurrentUnit(request)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }

  public async deleteUserCourse(req: any, res: any) {
    this.logger.info("UserCourseController - deleteUserCourse()");
    const id = req.params.id;
    await this.UserCourseService.deleteUserCourse(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async bulkCreateUserCourse(req: any, res: any) {
    this.logger.info("UserCourseController - bulkCreateUserCourse()");
    const userIds = req.body.userIds;
    const courseId = req.body.courseId;

    const users = await UserService.getInstance().getAllUsers();

    await userIds.map(async (userId) => {
      const request = {
        courseId: courseId,
        userId: userId,
      };
      await this.UserCourseService.createUserCourse(request).catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
    });

    res.status(200).send({ response: "Success" });
  }

  // const nonAdaptedUsers = ["62f69e6db9190a542c45c61f", "62f69e6cb9190a542c45c61d", "62f69e69b9190a542c45c61b", "62f69e95b9190a542c45c625"];
}
