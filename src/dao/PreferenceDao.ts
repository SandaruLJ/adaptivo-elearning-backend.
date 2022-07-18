import { Logger } from "../loaders/logger.js";
import { IPreference } from "../interfaces/IPreference.js";
import Preference from "../models/Preference.js";

export class PreferenceDao {
  private logger = Logger.getInstance();
  public static instance: PreferenceDao = null;

  public static getInstance(): PreferenceDao {
    if (this.instance === null) {
      this.instance = new PreferenceDao();
    }
    return this.instance;
  }

  public async save(request: IPreference) {
    this.logger.info("PreferenceDao - save()");
    const preference = new Preference(request);
    return preference
      .save()
      .then((data) => {
        this.logger.info(`Preference ${data.question} Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting Preference" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("PreferenceDao - getAll()");
    return Preference.find({})
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`Preference Retrieved Successfully`);
        } else {
          this.logger.info(`Preference Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving Preference" + error.message);
        throw error;
      });
  }

  public async getById(id: string) {
    this.logger.info("PreferenceDao - getById()");
    return Preference.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.question} Preference Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`Preference ${id} Not Found`);
          return { msg: "Preference Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving Preference ${id} ${error.message}`);
        throw error;
      });
  }

  public async update(id: string, course: IPreference) {
    this.logger.info("PreferenceDao - update()");
    return Preference.findByIdAndUpdate(id, { $set: course }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data.question} Preference Updated Successfully`);
          return data;
        } else {
          this.logger.info(`Preference ${id} Not Found`);
          return { msg: "Preference Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating Preference ${id} ${error.message}`);
        throw error;
      });
  }

  public async delete(id: string) {
    this.logger.info("PreferenceDao - delete()");
    return Preference.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.question} Preference Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`Preference ${id} Not Found`);
          return { msg: "Preference Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting Preference ${id} ${error.message}`);
        throw error;
      });
  }
}
