import { IUserCourse } from "../../interfaces/IUserCourse.js";

export interface IUserCourseService {
  createUserCourse(request: IUserCourse): Promise<IUserCourse>;
  getAllUserCourse(): Promise<IUserCourse[]>;
  getUserCourseById(id: string): Promise<IUserCourse | Object>;
  updateUserCourse(id: string, product: IUserCourse): Promise<IUserCourse | Object>;
  deleteUserCourse(id: string): Promise<IUserCourse | Object>;
}
