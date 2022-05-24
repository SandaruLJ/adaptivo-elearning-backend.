import { IUserActivity } from "../../interfaces/IUserActivity.js";

export interface IUserActivityService {
  createUserActivity(request: IUserActivity): Promise<IUserActivity>;
  getAllUserActivity(): Promise<IUserActivity[]>;
}
