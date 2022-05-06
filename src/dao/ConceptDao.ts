import { Logger } from "../loaders/logger.js";
import { IConcept } from "../interfaces/IConcept.js";
import Concept from "../models/Concept.js";

export class ConceptDao {
  private logger = Logger.getInstance();
  public static instance: ConceptDao = null;

  public static getInstance(): ConceptDao {
    if (this.instance === null) {
      this.instance = new ConceptDao();
    }
    return this.instance;
  }

  public async save(request: IConcept) {
    this.logger.info("ConceptDao - save()");
    const concept = new Concept(request);
    return concept
      .save()
      .then((data) => {
        this.logger.info(`Concept ${data.name} Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting Concept" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("ConceptDao - getAll()");
    return Concept.find({})
      .populate("learningObjects")
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`Concept Retrieved Successfully`);
        } else {
          this.logger.info(`Concept Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving Concepts" + error.message);
        throw error;
      });
  }

  public async getById(id: string) {
    this.logger.info("ConceptDao - getById()");
    return Concept.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.name} Concept Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`Concept ${id} Not Found`);
          return { msg: "Concept Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving Concept ${id} ${error.message}`);
        throw error;
      });
  }

  public async update(id: string, concept: IConcept) {
    this.logger.info("ConceptDao - update()");
    return Concept.findByIdAndUpdate(id, { $set: concept }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data.name} Concept Updated Successfully`);
          return data;
        } else {
          this.logger.info(`Concept ${id} Not Found`);
          return { msg: "Concept Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating Concept ${id} ${error.message}`);
        throw error;
      });
  }

  public async delete(id: string) {
    this.logger.info("ConceptDao - delete()");
    return Concept.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.name} Concept Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`Concept ${id} Not Found`);
          return { msg: "Concept Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting Concept ${id} ${error.message}`);
        throw error;
      });
  }
}
