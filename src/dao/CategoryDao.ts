import { Logger } from "../loaders/logger.js";
import { ICategory } from "../interfaces/ICategory.js";
import Category from "../models/Category.js";

export class CategoryDao {
  private logger = Logger.getInstance();
  public static instance: CategoryDao = null;

  public static getInstance(): CategoryDao {
    if (this.instance === null) {
      this.instance = new CategoryDao();
    }
    return this.instance;
  }

  public async save(request: ICategory) {
    this.logger.info("CategoryDao - save()");
    const category = new Category(request);
    return category
      .save()
      .then((data) => {
        this.logger.info(`Category ${data.title} Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting category" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("CategoryDao - getAll()");
    return Category.find({})
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`Category Retrieved Successfully`);
        } else {
          this.logger.info(`Category Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving Category" + error.message);
        throw error;
      });
  }

  public async getById(id: string) {
    this.logger.info("CategoryDao - getById()");
    return Category.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.title} Category Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`Category ${id} Not Found`);
          return { msg: "Category Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving Category ${id} ${error.message}`);
        throw error;
      });
  }

  public async update(id: string, course: ICategory) {
    this.logger.info("CategoryDao - update()");
    return Category.findByIdAndUpdate(id, { $set: course }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data.title} Category Updated Successfully`);
          return data;
        } else {
          this.logger.info(`Category ${id} Not Found`);
          return { msg: "Category Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating Category ${id} ${error.message}`);
        throw error;
      });
  }

  public async delete(id: string) {
    this.logger.info("CategoryDao - delete()");
    return Category.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.title} Category Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`Category ${id} Not Found`);
          return { msg: "Category Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting Category ${id} ${error.message}`);
        throw error;
      });
  }
}
