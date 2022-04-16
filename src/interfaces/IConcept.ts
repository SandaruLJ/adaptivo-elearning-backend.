export interface IConcept {
  _id?: string;
  name: string;
  preRequisites: string[];
  learningObjects: string[];
}
