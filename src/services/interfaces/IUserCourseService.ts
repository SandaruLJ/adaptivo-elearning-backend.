import { IUserCourse } from "../../interfaces/IUserCourse.js";

export interface IUserCourseService {
  createUserCourse(request: IUserCourse): Promise<IUserCourse>;
  getAllUserCourse(): Promise<IUserCourse[]>;
  getUserCourseById(id: string): Promise<IUserCourse | Object>;
  getUserCourseByUserId(email: string): Promise<IUserCourse[] | Object>;
  updateUserCourse(id: string, request: IUserCourse): Promise<IUserCourse | Object>;
  deleteUserCourse(id: string): Promise<IUserCourse | Object>;
  markIsCompleted(request: any): Promise<IUserCourse | Object>;
  markDuration(request: any): Promise<IUserCourse | Object>;
  setQuizScore(request: any): Promise<IUserCourse | Object>;
  changeCurrentUnit(request: any): Promise<IUserCourse | Object>;
}
