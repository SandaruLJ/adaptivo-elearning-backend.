import { ILesson } from "../interfaces/ILesson.js";
import { Logger } from "../loaders/logger.js";
import { ILessonService } from "./interfaces/ILessonService.js";
import { LessonDao } from "../dao/LessonDao.js";

export class LessonService implements ILessonService {
  private logger = Logger.getInstance();
  public static instance: LessonService = null;
  private LessonDao = LessonDao.getInstance();
  public static getInstance(): LessonService {
    if (this.instance === null) {
      this.instance = new LessonService();
    }
    return this.instance;
  }

  public async createLesson(request: ILesson): Promise<ILesson> {
    this.logger.info("LessonService - createLesson()");

    return this.LessonDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllLesson(): Promise<ILesson[]> {
    this.logger.info("LessonService - getAllLesson()");
    return this.LessonDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getLessonById(id: string): Promise<ILesson | Object> {
    this.logger.info("LessonService - getLessonById()");
    return this.LessonDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateLesson(id: string, Lesson: ILesson): Promise<ILesson | Object> {
    this.logger.info("LessonService - updateLesson()");
    return this.LessonDao.update(id, Lesson)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteLesson(id: string): Promise<ILesson | Object> {
    this.logger.info("LessonService - deleteLesson()");
    return this.LessonDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
