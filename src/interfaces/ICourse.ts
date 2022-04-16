export interface ICourse {
  _id?: string;
  title: string;
  subTitle: string;
  description: string;
  language: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  level: string;
  curriculum: any;
  learningOutcomes: string[];
  preRequisites: string[];
}
