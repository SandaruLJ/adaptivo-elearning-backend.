import { Logger } from "../loaders/logger.js";
import { IQuizSelectionService } from "./interfaces/IQuizSelectionService.js";
import { getConcepts } from "../quiz-selection/concepts.js";
import { getLearningObjects } from "../quiz-selection/learning_objects.js";
import { getQuizzes } from "../quiz-selection/quizzes.js";
import { spawn } from "child_process";
import { ConceptService } from "./ConceptService.js";
import { LearningObjectService } from "./LearningObjectService.js";
import { QuizService } from "./QuizService.js";

export class QuizSelectionService implements IQuizSelectionService {
  private logger = Logger.getInstance();
  public static instance: QuizSelectionService = null;

  public static getInstance(): QuizSelectionService {
    if (this.instance === null) {
      this.instance = new QuizSelectionService();
    }
    return this.instance;
  }

  public async selectQuiz(target: string, prevConcept: string, prevLearningObject: string, answerCorrect: string): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      // Get required data
      const data = await this.fetchRequiredData();

      // Stringify data
      const concepts = data["concepts"];
      const learningObjects = data["learningObjects"];
      const quizzes = data["quizzes"];

      // Run Python script for learning path generation
      //   const script = spawn('python3', [
      //       'dist/quiz-selection/quiz_selection.py',
      //       concepts,
      //       learningObjects,
      //       quizzes,
      //       target,
      //       prevConcept,
      //       prevLearningObject,
      //       answerCorrect
      //   ]);
      const params = {
        concepts,
        learningObjects,
        quizzes,
        target,
        prevConcept,
        prevLearningObject,
        answerCorrect,
      };
      const script = spawn("python3", ["dist/quiz-selection/quiz_selection.py"]);

      script.stdin.write(JSON.stringify(params) + "\n");

      let quiz = {};

      script.stdout.on("data", (data) => {
        quiz = JSON.parse(data.toString());
      });

      script.stderr.on("data", (error) => {
        console.log(error.toString());
        reject();
      });

      script.on("close", () => {
        resolve(quiz);
      });
    });
  }

  private async fetchRequiredData(): Promise<Object> {
    let data: any = {
      concepts: [],
      learningObjects: [],
      Quizzes: [],
    };

    data.concepts = await ConceptService.getInstance().getAllConcept();
    data.learningObjects = await LearningObjectService.getInstance().getAllLearningObject();
    data.quizzes = await QuizService.getInstance().getAllQuiz();

    return data;
  }
}
