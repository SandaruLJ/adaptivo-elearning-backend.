import { Logger } from "../loaders/logger.js";
import { PreferenceService } from "../services/PreferenceService.js";
import { IPreference } from "../interfaces/IPreference.js";
import { IPreferenceService } from "../services/interfaces/IPreferenceService.js";
import Preference from "../models/Preference.js";

import autoBind from "auto-bind";

export default class PreferenceController {
  private logger: Logger;
  private PreferenceService: IPreferenceService;

  constructor() {
    this.logger = Logger.getInstance();
    this.PreferenceService = PreferenceService.getInstance();
    autoBind(this);
  }

  public async createPreference(req: any, res: any) {
    this.logger.info("PreferenceController - createPreference()");

    if (req.body) {
      const Preference: IPreference = req.body;

      await this.PreferenceService.createPreference(Preference)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllPreference(req: any, res: any) {
    this.logger.info("PreferenceController - getAllPreference()");

    await this.PreferenceService.getAllPreference()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getPreferenceById(req: any, res: any) {
    this.logger.info("PreferenceController - getPreferenceById()");
    const id = req.params.id;
    await this.PreferenceService.getPreferenceById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async updatePreference(req: any, res: any) {
    this.logger.info("PreferenceController - updatePreference()");
    const id = req.params.id;

    if (req.body) {
      const Preference: IPreference = req.body;

      await this.PreferenceService.updatePreference(id, Preference)
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

  public async deletePreference(req: any, res: any) {
    this.logger.info("PreferenceController - deletePreference()");
    const id = req.params.id;
    await this.PreferenceService.deletePreference(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
}
