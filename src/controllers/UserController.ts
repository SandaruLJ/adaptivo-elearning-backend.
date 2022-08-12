import { Logger } from "../loaders/logger.js";
import IUser from "../interfaces/IUser.js";
import IUserService from "../services/interfaces/IUserService.js";
import { UserService } from "../services/UserService.js";
import autoBind from "auto-bind";
import UserNotFoundError from "../errors/UserNotFoundError.js";

export default class UserController {
  private logger: Logger;
  private userService: IUserService;

  constructor() {
    this.logger = Logger.getInstance();
    this.userService = UserService.getInstance();
    autoBind(this);
  }

  public async createUser(req: any, res: any): Promise<void> {
    this.logger.info("UserController - createUser()");

    if (req.body) {
      const user: IUser = req.body;
      await this.userService
        .createUser(user)
        .then((data) => {
          res.status(201).send(data);
        })
        .catch((error) => {
          this.logger.error(`Error occurred while inserting user: ${error}`);
          res.status(500).send({ err: error.message });
        });
    } else {
      this.logger.error("No request body.");
      res.status(400).send({ err: "No request body" });
    }
  }

  public async getAllUsers(req: any, res: any): Promise<void> {
    this.logger.info("UserController - getAllUsers()");

    await this.userService
      .getAllUsers()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(`Error occurred while retrieving users: ${error}`);
        res.status(500).send({ err: error.message });
      });
  }

  public async getUserById(req: any, res: any) {
    this.logger.info("UserController - getUserById()");

    const id = req.params.id;

    await this.userService
      .getUserById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(`Error occurred while retrieving user '${id}': ${error}`);

        if (error instanceof UserNotFoundError) {
          res.status(error.status).send({ err: error.message });
        } else {
          res.status(500).send({ err: error.message });
        }
      });
  }

  public async updateUser(req: any, res: any) {
    this.logger.info("UserController - updateUser()");

    const id = req.params.id;

    if (req.body) {
      const user: IUser = req.body;

      await this.userService
        .updateUser(id, user)
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          this.logger.error(`Error occurred while updating user '${id}': ${error}`);

          if (error instanceof UserNotFoundError) {
            res.status(error.status).send({ err: error.message });
          } else {
            res.status(500).send({ err: error.message });
          }
        });
    } else {
      this.logger.error("No request body.");
      res.status(400).send({ err: "No request body" });
    }
  }

  public async deleteUser(req: any, res: any) {
    this.logger.info("UserController - deleteUser()");

    const id = req.params.id;

    await this.userService
      .deleteUser(id)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        this.logger.error(`Error occurred while deleting user '${id}': ${error}`);

        if (error instanceof UserNotFoundError) {
          res.status(error.status).send({ err: error.message });
        } else {
          res.status(500).send({ err: error.message });
        }
      });
  }
}
