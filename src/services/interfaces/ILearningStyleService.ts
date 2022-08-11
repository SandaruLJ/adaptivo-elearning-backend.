import { ILearningStyle } from "../../interfaces/ILearningStyle.js";

export interface ILearningStyleService {
  analyzeInitialUserPreference(request: ILearningStyle): Promise<ILearningStyle>;
  createLearningStyle(request: ILearningStyle): Promise<ILearningStyle>;
  getAllLearningStyle(): Promise<ILearningStyle[]>;
  getLearningStyleById(id: string): Promise<ILearningStyle | Object>;
  updateLearningStyle(data: any): Promise<Object>;
  deleteLearningStyle(id: string): Promise<ILearningStyle | Object>;
  analyzeLearningStyles(): Promise<any>;
}
