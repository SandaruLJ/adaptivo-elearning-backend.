import { IConcept } from "../../interfaces/IConcept.js";

export interface IConceptService {
  createConcept(request: IConcept): Promise<IConcept>;
  getAllConcept(): Promise<IConcept[]>;
  getConceptById(id: string): Promise<IConcept | Object>;
  updateConcept(id: string, product: IConcept): Promise<IConcept | Object>;
  deleteConcept(id: string): Promise<IConcept | Object>;
  getVideoSignedUrl(fileName: string): Promise<Object>;
  getAudioSignedUrl(fileName: string): Promise<Object>;
}
