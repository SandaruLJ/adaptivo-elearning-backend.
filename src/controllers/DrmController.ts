import autoBind from "auto-bind";
import { IDrmService } from "../services/interfaces/IDrmService.js";
import { Logger } from "../loaders/logger.js";
import { DrmService } from "../services/DrmService.js";
import { CourseService } from "../services/CourseService.js";

export default class DrmController {
  private logger: Logger;
  private DrmService: IDrmService;

  constructor() {
    this.logger = Logger.getInstance();
    this.DrmService = DrmService.getInstance();
    autoBind(this);
  }
  public async generateLicenseToken(req: any, res: any) {
    this.logger.info("DrmController -generateLiceneseToken()");
    if (req.body) {
      await this.DrmService.generateLicenseToken(req.body.keyId)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async encodeCourse(req: any, res: any) {
    this.logger.info("DrmController -encodeCourse()");
    if (req.body) {
      await CourseService.getInstance()
        .encodeCourse(req.body.courseId)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
}
