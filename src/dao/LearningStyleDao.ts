import { Logger } from "../loaders/logger.js";
import { ILearningStyle } from "../interfaces/ILearningStyle.js";
import LearningStyle from "../models/LearningStyle.js";
import mongoose from "mongoose";

export class LearningStyleDao {
  private logger = Logger.getInstance();
  public static instance: LearningStyleDao = null;

  public static getInstance(): LearningStyleDao {
    if (this.instance === null) {
      this.instance = new LearningStyleDao();
    }
    return this.instance;
  }

  public async save(request: ILearningStyle) {
    this.logger.info("LearningStyleDao - save()");
    const learningStyle = new LearningStyle(request);
    return learningStyle
      .save()
      .then((data) => {
        this.logger.info(`LearningStyle ${data._id} Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting LearningStyle" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("LearningStyleDao - getAll()");
    return LearningStyle.find({})
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`LearningStyle Retrieved Successfully`);
        } else {
          this.logger.info(`LearningStyle Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving LearningStyle" + error.message);
        throw error;
      });
  }

  public async getById(id: string) {
    this.logger.info("LearningStyleDao - getById()");
    return LearningStyle.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data._id} LearningStyle Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`LearningStyle ${id} Not Found`);
          return { msg: "LearningStyle Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving LearningStyle ${id} ${error.message}`);
        throw error;
      });
  }

  public async getByUserId(id: string) {
    this.logger.info("LearningStyleDao - getByUserId()");

    return LearningStyle.findOne({ userId: id })
      .then((data) => {
        if (data) {
          this.logger.info(`${data._id} LearningStyle Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`LearningStyle of user ${id} Not Found`);
          return { msg: "LearningStyle Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving LearningStyle ${id} ${error.message}`);

        throw error;
      });
  }

  public async update(id: string, course: ILearningStyle) {
    this.logger.info("LearningStyleDao - update()");
    return LearningStyle.findByIdAndUpdate(id, { $set: course }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data._id} LearningStyle Updated Successfully`);
          return data;
        } else {
          this.logger.info(`LearningStyle ${id} Not Found`);
          return { msg: "LearningStyle Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating LearningStyle ${id} ${error.message}`);
        throw error;
      });
  }

  public async delete(id: string) {
    this.logger.info("LearningStyleDao - delete()");
    return LearningStyle.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data._id} LearningStyle Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`LearningStyle ${id} Not Found`);
          return { msg: "LearningStyle Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting LearningStyle ${id} ${error.message}`);
        throw error;
      });
  }
}
