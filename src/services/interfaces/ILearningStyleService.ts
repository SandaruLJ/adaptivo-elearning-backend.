import { ILearningStyle } from "../../interfaces/ILearningStyle.js";

export interface ILearningStyleService {
  analyzeInitialUserPreference(request: ILearningStyle): Promise<ILearningStyle>;
  createLearningStyle(request: ILearningStyle): Promise<ILearningStyle>;
  getAllLearningStyle(): Promise<ILearningStyle[]>;
  getLearningStyleById(id: string): Promise<ILearningStyle | Object>;
  updateLearningStyle(id: string, product: ILearningStyle): Promise<ILearningStyle | Object>;
  deleteLearningStyle(id: string): Promise<ILearningStyle | Object>;
}
