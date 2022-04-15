import { IConcept } from "../interfaces/IConcept.js";
import { Logger } from "../loaders/logger.js";
import { IConceptService } from "./interfaces/IConceptService.js";
import { ConceptDao } from "../dao/ConceptDao.js";
import { getPreSignedUrl } from "../libs/getPreSignedUrl.js";

export class ConceptService implements IConceptService {
  private logger = Logger.getInstance();
  public static instance: ConceptService = null;
  private ConceptDao = ConceptDao.getInstance();
  public static getInstance(): ConceptService {
    if (this.instance === null) {
      this.instance = new ConceptService();
    }
    return this.instance;
  }

  public async createConcept(request: IConcept): Promise<IConcept> {
    this.logger.info("ConceptService - createConcept()");

    return this.ConceptDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllConcept(): Promise<IConcept[]> {
    this.logger.info("ConceptService - getAllConcept()");
    return this.ConceptDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getConceptById(id: string): Promise<IConcept | Object> {
    this.logger.info("ConceptService - getConceptById()");
    return this.ConceptDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateConcept(id: string, Concept: IConcept): Promise<IConcept | Object> {
    this.logger.info("ConceptService - updateConcept()");
    return this.ConceptDao.update(id, Concept)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteConcept(id: string): Promise<IConcept | Object> {
    this.logger.info("ConceptService - deleteConcept()");
    return this.ConceptDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async getVideoSignedUrl(fileName: string): Promise<Object> {
    this.logger.info("ConceptService - getVideoSignedUrl()");

    const bucketName = `spark-courses`;
    const key = `62272fbfc8ea4d8b75b76aa2/concepts/videos/${fileName}`;

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
    this.logger.info("ConceptService - getAudioSignedUrl()");

    const bucketName = `62272fbfc8ea4d8b75b76aa2`;
    const key = `concepts/audio/${fileName}`;

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
