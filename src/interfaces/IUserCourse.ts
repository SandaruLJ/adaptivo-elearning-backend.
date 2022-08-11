export interface IUserCourse {
  _id?: string;
  userId: string;
  courseId: string;
  learningPath: object[];
  progress: number;
  currentUnit: object;
}
