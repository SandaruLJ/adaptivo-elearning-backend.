import { Logger } from "../loaders/logger.js";
import { ILearningResource } from "../interfaces/ILearningResource.js";
import LearningResource from "../models/LearningResource.js";

export class LearningResourceDao {
  private logger = Logger.getInstance();
  public static instance: LearningResourceDao = null;

  public static getInstance(): LearningResourceDao {
    if (this.instance === null) {
      this.instance = new LearningResourceDao();
    }
    return this.instance;
  }

  public async save(request: ILearningResource) {
    this.logger.info("LearningResourceDao - save()");
    const learningResource = new LearningResource(request);
    return learningResource
      .save()
      .then((data) => {
        this.logger.info(`LearningResource ${data.name} Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting LearningResource" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("LearningResourceDao - getAll()");
    return LearningResource.find({})
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`LearningResource Retrieved Successfully`);
        } else {
          this.logger.info(`LearningResource Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving LearningResources" + error.message);
        throw error;
      });
  }

  public async getById(id: string) {
    this.logger.info("LearningResourceDao - getById()");
    return LearningResource.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.name} LearningResource Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`LearningResource ${id} Not Found`);
          return { msg: "LearningResource Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving LearningResource ${id} ${error.message}`);
        throw error;
      });
  }

  public async update(id: string, learningResource: ILearningResource) {
    this.logger.info("LearningResourceDao - update()");
    return LearningResource.findByIdAndUpdate(id, { $set: LearningResource }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data.name} LearningResource Updated Successfully`);
          return data;
        } else {
          this.logger.info(`LearningResource ${id} Not Found`);
          return { msg: "LearningResource Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating LearningResource ${id} ${error.message}`);
        throw error;
      });
  }

  public async delete(id: string) {
    this.logger.info("LearningResourceDao - delete()");
    return LearningResource.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.name} LearningResource Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`LearningResource ${id} Not Found`);
          return { msg: "LearningResource Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting LearningResource ${id} ${error.message}`);
        throw error;
      });
  }
}
