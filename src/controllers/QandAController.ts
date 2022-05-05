import { Logger } from "../loaders/logger.js";
import { QandAService } from "../services/QandAService.js";
import { IQandA } from "../interfaces/IQandA.js";
import { IQandAService } from "../services/interfaces/IQandAService.js";
import autoBind from "auto-bind";

export default class QandAController {
  private logger: Logger;
  private QandAService: IQandAService;

  constructor() {
    this.logger = Logger.getInstance();
    this.QandAService = QandAService.getInstance();
    autoBind(this);
  }

  public async createQandA(req: any, res: any) {
    this.logger.info("QandAController - createQandA()");

    if (req.body) {
      await this.QandAService
        .createQandA(req.body)
        .then((data) => {
          res.status(200).send(data);
        })

        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllQandA(req: any, res: any) {
    this.logger.info("QandAController - getAllQandA()");

    await this.QandAService
      .getAllQandA()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getQandAById(req: any, res: any) {
    this.logger.info("QandAController - getQandAById()");
    const id = req.params.id;
    await this.QandAService
      .getQandAById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async updateQandA(req: any, res: any) {
    this.logger.info("QandAController - updateQandA()");

    const id = req.params.id;
    const QandA: IQandA = req.body;
    await this.QandAService
      .updateQandA(id, QandA)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async deleteQandA(req: any, res: any) {
    this.logger.info("QandAController - deleteQandA()");
    const id = req.params.id;
    await this.QandAService
      .deleteQandA(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
}
