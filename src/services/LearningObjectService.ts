import { ILearningObject } from "../interfaces/ILearningObject.js";
import { Logger } from "../loaders/logger.js";
import { ILearningObjectService } from "./interfaces/ILearningObjectService.js";
import { LearningObjectDao } from "../dao/LearningObjectDao.js";

export class LearningObjectService implements ILearningObjectService {
  private logger = Logger.getInstance();
  public static instance: LearningObjectService = null;
  private LearningObjectDao = LearningObjectDao.getInstance();
  public static getInstance(): LearningObjectService {
    if (this.instance === null) {
      this.instance = new LearningObjectService();
    }
    return this.instance;
  }

  public async createLearningObject(request: ILearningObject): Promise<ILearningObject> {
    this.logger.info("LearningObjectService - createLearningObject()");

    return this.LearningObjectDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllLearningObject(): Promise<ILearningObject[]> {
    this.logger.info("LearningObjectService - getAllLearningObject()");
    return this.LearningObjectDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getLearningObjectById(id: string): Promise<ILearningObject | Object> {
    this.logger.info("LearningObjectService - getLearningObjectById()");
    return this.LearningObjectDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateLearningObject(id: string, LearningObject: ILearningObject): Promise<ILearningObject | Object> {
    this.logger.info("LearningObjectService - updateLearningObject()");
    return this.LearningObjectDao.update(id, LearningObject)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteLearningObject(id: string): Promise<ILearningObject | Object> {
    this.logger.info("LearningObjectService - deleteLearningObject()");
    return this.LearningObjectDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
