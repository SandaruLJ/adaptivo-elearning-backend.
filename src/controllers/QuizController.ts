import { Logger } from "../loaders/logger.js";
import { QuizService } from "../services/QuizService.js";
import { IQuiz } from "../interfaces/IQuiz.js";
import { IQuizService } from "../services/interfaces/IQuizService.js";
import autoBind from "auto-bind";

export default class QuizController {
  private logger: Logger;
  private quizService: IQuizService;

  constructor() {
    this.logger = Logger.getInstance();
    this.quizService = QuizService.getInstance();
    autoBind(this);
  }

  public async createQuiz(req: any, res: any) {
    this.logger.info("QuizController - createQuiz()");

    if (req.body) {
      await this.quizService
        .createQuiz(req.body)
        .then((data) => {
          res.status(200).send(data);
        })

        .catch((error) => {
          this.logger.error(error.message);
          res.status(500).send({ err: error.message });
        });
    }
  }
  public async getAllQuiz(req: any, res: any) {
    this.logger.info("QuizController - getAllQuiz()");

    await this.quizService
      .getAllQuiz()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
  public async getQuizById(req: any, res: any) {
    this.logger.info("QuizController - getQuizById()");
    const id = req.params.id;
    await this.quizService
      .getQuizById(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async updateQuiz(req: any, res: any) {
    this.logger.info("QuizController - updateQuiz()");

    const id = req.params.id;
    const quiz: IQuiz = req.body;
    await this.quizService
      .updateQuiz(id, quiz)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }

  public async deleteQuiz(req: any, res: any) {
    this.logger.info("QuizController - deleteQuiz()");
    const id = req.params.id;
    await this.quizService
      .deleteQuiz(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        this.logger.error(error.message);
        res.status(500).send({ err: error.message });
      });
  }
}
