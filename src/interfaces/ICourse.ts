export interface ICourse {
  _id?: string;
  title: string;
  subtitle: string;
  category: string;
  subCategory: string;
  language: string;
  level: string;
  thumbnail: object;
  trailer: object;
  description: string;
  tier: string;
  price: number;
  welcome: string;
  congratulations: string;
  instructors: string[];
  currency: string;
  curriculum: any;
  outcomes: string[];
  requirements: string[];
}
