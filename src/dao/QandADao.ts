import { Logger } from "../loaders/logger.js";
import { IQandA } from "../interfaces/IQandA.js";
import QandA from "../models/QandA.js";

export class QandADao {
  private logger = Logger.getInstance();
  public static instance: QandADao = null;

  public static getInstance(): QandADao {
    if (this.instance === null) {
      this.instance = new QandADao();
    }
    return this.instance;
  }

  public async save(request: IQandA) {
    this.logger.info("QandADao - save()");
    const qanda = new QandA(request);
    return await qanda
      .save()
      .then((data) => {
        this.logger.info(`QandA ${data.id} Inserted Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting QandA" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("QandADao - getAll()");
    return await QandA.find({})
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`QandA Retrieved Successfully`);
        } else {
          this.logger.info(`QandA Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving QandA" + error.message);
        throw error;
      });
  }

  public async getById(id: String) {
    this.logger.info("QandADao - getById()");
    return await QandA.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.id} QandA Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`QandA ${id} Not Found`);
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving QandA ${id} ${error.message}`);
        throw error;
      });
  }

  public async update(id: String, qanda: IQandA) {
    this.logger.info("QandADao - update()");
    return await QandA.findByIdAndUpdate(id, { $set: qanda }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data.id} QandA
                     Updated Successfully`);
          return data;
        } else {
          this.logger.info(`QandA ${id} Not Found`);
          return { msg: "QandA Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating QandA ${id} ${error.message}`);
        throw error;
      });
  }

  public async delete(id: String) {
    this.logger.info("QandADao - delete()");
    return await QandA.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.id} QandA Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`QandA ${id} Not Found`);
          return { msg: "QandA Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting QandA ${id} ${error.message}`);
        throw error;
      });
  }
}
