import { Logger } from "../loaders/logger";
import { ConceptService } from "../services/ConceptService";
import { IConcept } from "../interfaces/IConcept";
import { IConceptService } from "../services/interfaces/IConceptService";
const autoBind = require("auto-bind");

export default class ConceptController {
  private logger: Logger;
  private ConceptService: IConceptService;

  constructor() {
    this.logger = Logger.getInstance();
    this.ConceptService = ConceptService.getInstance();
    autoBind(this);
  }

  public async createConcept(req: any, res: any) {
    this.logger.info("ConceptController - createConcept()");

    if (req.body) {
      const Concept: IConcept = req.body;
      await this.ConceptService.createConcept(Concept)
        .then((data) => {
          res.status(200).send(data);
        })

        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllConcepts(req: any, res: any) {
    this.logger.info("ConceptController - getAllConcept()");

    await this.ConceptService.getAllConcept()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getConceptById(req: any, res: any) {
    this.logger.info("ConceptController - getConceptById()");
    const id = req.params.id;
    await this.ConceptService.getConceptById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async updateConcept(req: any, res: any) {
    this.logger.info("ConceptController - updateConcept()");
    const id = req.params.id;

    if (req.body) {
      const Concept: IConcept = req.body;

      await this.ConceptService.updateConcept(id, Concept)
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

  public async deleteConcept(req: any, res: any) {
    this.logger.info("ConceptController - deleteConcept()");
    const id = req.params.id;
    await this.ConceptService.deleteConcept(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getSignedUrl(req: any, res: any) {
    this.logger.info("ConceptController - getSignedUrl()");

    await this.ConceptService.getSignedUrl()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
}
