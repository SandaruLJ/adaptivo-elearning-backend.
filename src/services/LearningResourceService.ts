import { ILearningResource } from "../interfaces/ILearningResource.js";
import { Logger } from "../loaders/logger.js";
import { ILearningResourceService } from "./interfaces/ILearningResourceService.js";
import { LearningResourceDao } from "../dao/LearningResourceDao.js";
import { getPreSignedUrl } from "../libs/getPreSignedUrl.js";

export class LearningResourceService implements ILearningResourceService {
  private logger = Logger.getInstance();
  public static instance: LearningResourceService = null;
  private LearningResourceDao = LearningResourceDao.getInstance();
  public static getInstance(): LearningResourceService {
    if (this.instance === null) {
      this.instance = new LearningResourceService();
    }
    return this.instance;
  }

  public async createLearningResource(request: ILearningResource): Promise<ILearningResource> {
    this.logger.info("LearningResourceService - createLearningResource()");

    return this.LearningResourceDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllLearningResource(): Promise<ILearningResource[]> {
    this.logger.info("LearningResourceService - getAllLearningResource()");
    return this.LearningResourceDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getLearningResourceById(id: string): Promise<ILearningResource | Object> {
    this.logger.info("LearningResourceService - getLearningResourceById()");
    return this.LearningResourceDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateLearningResource(id: string, LearningResource: ILearningResource): Promise<ILearningResource | Object> {
    this.logger.info("LearningResourceService - updateLearningResource()");
    return this.LearningResourceDao.update(id, LearningResource)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteLearningResource(id: string): Promise<ILearningResource | Object> {
    this.logger.info("LearningResourceService - deleteLearningResource()");
    return this.LearningResourceDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async getVideoSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("LearningResourceService - getVideoSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/resources/videos/${fileName}`;

    return getPreSignedUrl(bucketName, key)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAudioSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("LearningResourceService - getAudioSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/resources/audio/${fileName}`;

    return getPreSignedUrl(bucketName, key)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
