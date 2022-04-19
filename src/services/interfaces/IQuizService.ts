import { IQuiz } from "../../interfaces/IQuiz.js";

export interface IQuizService {
  createQuiz(request: IQuiz): Promise<IQuiz>;
  getAllQuiz(): Promise<IQuiz[]>;
  getQuizById(id: String): Promise<IQuiz | Object>;
  updateQuiz(id: String, product: IQuiz): Promise<IQuiz | Object>;
  deleteQuiz(id: String): Promise<IQuiz | Object>;
}
