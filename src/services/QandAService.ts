import { IQandA } from "../interfaces/IQandA.js";
import { Logger } from "../loaders/logger.js";
import { IQandAService } from "./interfaces/IQandAService.js";
import { QandADao } from "../dao/QandADao.js";

export class QandAService implements IQandAService {
  private logger = Logger.getInstance();
  public static instance: QandAService = null;
  private QandADao = QandADao.getInstance();
  public static getInstance(): QandAService {
    if (this.instance === null) {
      this.instance = new QandAService();
    }
    return this.instance;
  }

  public async createQandA(request: IQandA): Promise<IQandA> {
    this.logger.info("QandA Services - createQandA()");

    return await this.QandADao.save(request)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getAllQandA(): Promise<IQandA[]> {
    this.logger.info("QandA Services - getAllQandA()");
    return await this.QandADao.getAll()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async getQandAById(id: String): Promise<IQandA | Object> {
    this.logger.info("QandA Services - getQandAById()");
    return await this.QandADao.getById(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }

  public async updateQandA(id: String, QandA: IQandA): Promise<IQandA | Object> {
    this.logger.info("QandA Services - updateQandA()");
    return await this.QandADao.update(id, QandA)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
  public async deleteQandA(id: String): Promise<IQandA | Object> {
    this.logger.info("QandA Services - deleteQandA()");
    return await this.QandADao.delete(id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw error;
      });
  }
}
