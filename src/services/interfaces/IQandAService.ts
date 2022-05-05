import { IQandA } from "../../interfaces/IQandA.js";

export interface IQandAService {
  createQandA(request: IQandA): Promise<IQandA>;
  getAllQandA(): Promise<IQandA[]>;
  getQandAById(id: String): Promise<IQandA | Object>;
  updateQandA(id: String, product: IQandA): Promise<IQandA | Object>;
  deleteQandA(id: String): Promise<IQandA | Object>;
}
