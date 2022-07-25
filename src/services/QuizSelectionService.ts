import { Logger } from '../loaders/logger.js';
import { IQuizSelectionService } from './interfaces/IQuizSelectionService.js';
import { getConcepts } from '../quiz-selection/concepts.js';
import { getLearningObjects } from '../quiz-selection/learning_objects.js';
import { getQuizzes } from '../quiz-selection/quizzes.js';
import { spawn } from 'child_process';

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
          const concepts = JSON.stringify(data['concepts']);
          const learningObjects = JSON.stringify(data['learningObjects']);
          const quizzes = JSON.stringify(data['quizzes']);
          
          // Run Python script for learning path generation
          const script = spawn('python3', [
              'dist/quiz-selection/quiz_selection.py',
              concepts,
              learningObjects,
              quizzes,
              target,
              prevConcept,
              prevLearningObject,
              answerCorrect
          ]);

          let quiz = {};

          script.stdout.on('data', (data) => {
              quiz = JSON.parse(data.toString());
          });

          script.stderr.on('data', (error) => {
              console.log(error.toString());
              reject();
          });

          script.on('close', () => {
              resolve(quiz);
          });
      });
  }

  private async fetchRequiredData(): Promise<Object> {
      let data: any = {
          concepts: [],
          learningObjects: [],
          Quizzes: [],
      }
      
      data.concepts = await getConcepts();
      data.learningObjects = await getLearningObjects();
      data.quizzes = await getQuizzes();

      return data;
  }
}
