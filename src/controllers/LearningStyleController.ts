import { Logger } from "../loaders/logger.js";
import { LearningStyleService } from "../services/LearningStyleService.js";
import { ILearningStyle } from "../interfaces/ILearningStyle.js";
import { ILearningStyleService } from "../services/interfaces/ILearningStyleService.js";
import LearningStyle from "../models/LearningStyle.js";

import autoBind from "auto-bind";

export default class LearningStyleController {
  private logger: Logger;
  private LearningStyleService: ILearningStyleService;

  constructor() {
    this.logger = Logger.getInstance();
    this.LearningStyleService = LearningStyleService.getInstance();
    autoBind(this);
  }

  public async analyzeInitialUserPreference(req: any, res: any) {
    this.logger.info("LearningStyleController - analyzeInitialUserPreference()");

    if (req.body) {
      const request: any = req.body;

      await this.LearningStyleService.analyzeInitialUserPreference(request)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }

  public async createLearningStyle(req: any, res: any) {
    this.logger.info("LearningStyleController - createLearningStyle()");

    if (req.body) {
      const LearningStyle: ILearningStyle = req.body;

      await this.LearningStyleService.createLearningStyle(LearningStyle)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllLearningStyle(req: any, res: any) {
    this.logger.info("LearningStyleController - getAllLearningStyle()");

    await this.LearningStyleService.getAllLearningStyle()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async analyzeLearningStyles(req: any, res: any) {
    this.logger.info("LearningStyleController - analyzeLearningStyles()");

    await this.LearningStyleService.analyzeLearningStyles()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getLearningStyleById(req: any, res: any) {
    this.logger.info("LearningStyleController - getLearningStyleById()");
    const id = req.params.id;
    await this.LearningStyleService.getLearningStyleById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async updateLearningStyle(req: any, res: any) {
    this.logger.info("LearningStyleController - updateLearningStyle()");

    if (req.body) {
      const LearningStyle: ILearningStyle = req.body;

      await this.LearningStyleService.updateLearningStyle(LearningStyle)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    } else {
      res.status(404);
    }
  }

  public async deleteLearningStyle(req: any, res: any) {
    this.logger.info("LearningStyleController - deleteLearningStyle()");
    const id = req.params.id;
    await this.LearningStyleService.deleteLearningStyle(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
}
