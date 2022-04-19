export interface IQuiz {
  _id?: string;
  question: string;
  explanation: string;
  answers: string[];
  correctAnswer: number;
}
