import { Logger } from "../loaders/logger.js";
import { ICourse } from "../interfaces/ICourse.js";
import Course from "../models/Course.js";
import LearningResource from "../models/LearningResource.js";

export class CourseDao {
  private logger = Logger.getInstance();
  public static instance: CourseDao = null;

  public static getInstance(): CourseDao {
    if (this.instance === null) {
      this.instance = new CourseDao();
    }
    return this.instance;
  }

  public async save(request: ICourse) {
    this.logger.info("CourseDao - save()");
    const course = new Course(request);
    return course
      .save()
      .then((data) => {
        this.logger.info(`Course ${data.title} Added Successfully`);
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in inserting course" + error.message);
        throw error;
      });
  }
  public async getAll() {
    this.logger.info("CourseDao - getAll()");
    return Course.find({})
      .populate("curriculum")
      .then((data) => {
        if (data.length > 0) {
          this.logger.info(`Course Retrieved Successfully`);
        } else {
          this.logger.info(`Course Not Found`);
        }
        return data;
      })
      .catch((error) => {
        this.logger.error("Error in retrieving Courses" + error.message);
        throw error;
      });
  }

  public async getById(id: string) {
    this.logger.info("CourseDao - getById()");
    return Course.findById(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.title} Course Retrieved Successfully`);
          return data;
        } else {
          this.logger.info(`Course ${id} Not Found`);
          return { msg: "Course Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in retrieving Course ${id} ${error.message}`);
        throw error;
      });
  }

  public async update(id: string, course: ICourse) {
    this.logger.info("CourseDao - update()");
    return Course.findByIdAndUpdate(id, { $set: course }, { new: true })
      .then((data) => {
        if (data) {
          this.logger.info(`${data.title} Course Updated Successfully`);
          return data;
        } else {
          this.logger.info(`Course ${id} Not Found`);
          return { msg: "Course Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in updating Course ${id} ${error.message}`);
        throw error;
      });
  }

  public async delete(id: string) {
    this.logger.info("CourseDao - delete()");
    return Course.findByIdAndDelete(id)
      .then((data) => {
        if (data) {
          this.logger.info(`${data.title} Course Deleted Successfully`);
          return data;
        } else {
          this.logger.info(`Course ${id} Not Found`);
          return { msg: "Course Not Found" };
        }
      })
      .catch((error) => {
        this.logger.error(`Error in deleting Course ${id} ${error.message}`);
        throw error;
      });
  }
}
