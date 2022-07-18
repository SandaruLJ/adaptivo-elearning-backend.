import { IPreference } from "../interfaces/IPreference.js";
import { Logger } from "../loaders/logger.js";
import { IPreferenceService } from "./interfaces/IPreferenceService.js";
import { PreferenceDao } from "../dao/PreferenceDao.js";

export class PreferenceService implements IPreferenceService {
  private logger = Logger.getInstance();
  public static instance: PreferenceService = null;
  private PreferenceDao = PreferenceDao.getInstance();
  public static getInstance(): PreferenceService {
    if (this.instance === null) {
      this.instance = new PreferenceService();
    }
    return this.instance;
  }

  public async createPreference(request: IPreference): Promise<IPreference> {
    this.logger.info("PreferenceService - createPreference()");

    return this.PreferenceDao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllPreference(): Promise<IPreference[]> {
    this.logger.info("PreferenceService - getAllPreference()");
    return this.PreferenceDao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getPreferenceById(id: string): Promise<IPreference | Object> {
    this.logger.info("PreferenceService - getPreferenceById()");
    return this.PreferenceDao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updatePreference(id: string, Course: IPreference): Promise<IPreference | Object> {
    this.logger.info("Customer Services - updateCustomer()");
    return this.PreferenceDao.update(id, Course)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deletePreference(id: string): Promise<IPreference | Object> {
    this.logger.info("PreferenceService - deletePreference()");
    return this.PreferenceDao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
