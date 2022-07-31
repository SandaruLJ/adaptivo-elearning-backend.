import { Logger } from "../loaders/logger.js";
import { UserCourseService } from "../services/UserCourseService.js";
import { IUserCourse } from "../interfaces/IUserCourse.js";
import { IUserCourseService } from "../services/interfaces/IUserCourseService.js";
import UserCourse from "../models/UserCourse.js";

import autoBind from "auto-bind";

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
    const id = req.params.id;
    await this.UserCourseService.getUserCourseByUserId(id)
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
}
