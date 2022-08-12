export interface IQuizSelectionService {
  selectQuiz(target: string, prevConcept: string, prevLearningObject: string, answerCorrect: string): Promise<Object>;
}