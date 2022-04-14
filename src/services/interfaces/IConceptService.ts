import { IConcept } from "../../interfaces/IConcept";

export interface IConceptService {
  createConcept(request: IConcept): Promise<IConcept>;
  getAllConcept(): Promise<IConcept[]>;
  getConceptById(id: string): Promise<IConcept | Object>;
  updateConcept(id: string, product: IConcept): Promise<IConcept | Object>;
  deleteConcept(id: string): Promise<IConcept | Object>;
  getSignedUrl();
}
